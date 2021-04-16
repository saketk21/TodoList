import * as $ from 'jquery';


$(() => {
    let todoList = [
        'Meet Cathy for UI discussion',
        'Design new UI Tour implementation',
        'Buy outdoor shorts',
        'Throw away old sweatshirt'
    ];

    const animateListAddMode = () => {
        $('div.list-container').fadeToggle(200, () => {
            $('div.animation-container-hidden').fadeToggle(400);
        });
    };

    const addListItem = (listItem) => {
        if (listItem) {
            todoList.push(listItem);
            paint();
        }
    }

    const animateAndAddItem = (listItem) => {
        $('div.animation-container-hidden').fadeToggle(200, () => {
            $('div.list-container').fadeToggle(400);
            addListItem(listItem);
        });
    }

    const animateAndCancelAdd = () => {
        $('div.animation-container-hidden').fadeToggle(200, () => {
            $('div.list-container').fadeToggle(400);
            $('#addNewItem').val('');
        });
    }

    const animateAndRemoveItem = (element, removedItemIndex) => {
        $(element).slideUp(200, () => {
            removeListItem(removedItemIndex);
        });
    };

    const removeListItem = (removedItemIndex) => {
        todoList = todoList.filter((_item, index) => removedItemIndex !== index);
        paint();
    }

    const useSuggestion = (suggestionText) => {
        suggestionText = suggestionText.trim().split('...')[0];
        suggestionText += ' ';
        $('#addNewItem').val(suggestionText);
        $('#addNewItem').trigger('focus')
    };

    const paint = () => {
        const createListItemNode = (listItem, index) => {
            // List Item element
            const li = document.createElement('li');

            // Add Item Label
            const itemLabel = document.createElement('span');
            itemLabel.classList.add('overflow');
            itemLabel.innerText = listItem;
            itemLabel.setAttribute('title', listItem);

            // Add Remove Icon
            const removeButton = document.createElement('button');
            removeButton.setAttribute('data-item-index', index);
            removeButton.innerHTML = '&#xE5CD;';
            removeButton.classList.add('material-icons', 'remove-item');

            // Hook click event for removing items
            removeButton.addEventListener('click', () => {
                const element = li;
                animateAndRemoveItem(element, index);
            });

            // Add all the individual elements to parent
            li.classList.add('list-item');
            li.append(itemLabel);
            li.append(removeButton);
            return li;
        };

        // Re-render todoList
        $('#listItems').html('');
        todoList.forEach((listItem, index) => {
            const listItemNode = createListItemNode(listItem, index);
            $('#listItems').append(listItemNode);
        });

        // Hide or show no items message if no items present
        if (todoList.length === 0) {
            $('#listItems').addClass('display-none');
            $('#noItemsContainer').removeClass('display-none');
        } else {
            $('#listItems').removeClass('display-none');
            $('#noItemsContainer').addClass('display-none');
        }

        // Clear the input
        $('#addNewItem').val('');
    };

    (() => {
        $('#btnAddItem').on('click', () => {
            animateListAddMode();
        });

        $('#addNewItem').on('keypress', (event) => {
            if (event.originalEvent.key === 'Enter' && event.originalEvent.target.value) {
                const listItemText = event.originalEvent.target.value;
                animateAndAddItem(listItemText);
            }
        });

        $('.card').on('click', (event) => {
            const suggestionText = event.originalEvent.target.innerText;
            useSuggestion(suggestionText);
        });

        $('#cancelAddItem').on('click', () => {
            animateAndCancelAdd();
        });

        paint();
    })();

});
