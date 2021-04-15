import * as $ from 'jquery';


$(() => {
    let todoList = [
        'Buy some eggs and meet up with Neil DeGrasse Tyson for a powwow on space and astronomy',
        'Call Dad for some money',
        'Read Harry Potter and The Order of Phoenix',
        'Buy some eggs and meet up with Neil DeGrasse Tyson for a powwow on space and astronomy',
        'Call Dad for some money',
        'Read Harry Potter and The Order of Phoenix', 'Buy some eggs and meet up with Neil DeGrasse Tyson for a powwow on space and astronomy',
        'Call Dad for some money',
        'Read Harry Potter and The Order of Phoenix', 'Buy some eggs and meet up with Neil DeGrasse Tyson for a powwow on space and astronomy',
        'Call Dad for some money',
        'Read Harry Potter and The Order of Phoenix', 'Buy some eggs and meet up with Neil DeGrasse Tyson for a powwow on space and astronomy',
        'Call Dad for some money',
        'Read Harry Potter and The Order of Phoenix'
    ];

    const animateListAddMode = (isAddMode) => {
        if (isAddMode) {
            $("div.list-container").fadeToggle(400, () => {
                $("#addItemContainer").fadeToggle(400);
            });
        } else {
            $("#addItemContainer").fadeToggle(400, () => {
                $("div.list-container").fadeToggle(400);
            });
        }
    };

    const addListItem = (listItem) => {
        if (listItem) {
            todoList.push(listItem);
            paint();
        }
    }

    const removeListItem = (removedItemIndex) => {
        todoList = todoList.filter((_item, index) => removedItemIndex !== index);
        paint();
    }

    const paint = () => {
        const createListItemNode = (listItem, index) => {
            // Add Item Label
            const itemLabel = document.createElement('span');
            itemLabel.classList.add('overflow');
            itemLabel.innerText = listItem;
            itemLabel.setAttribute('title', listItem);

            // Add Remove Icon
            const removeIcon = document.createElement('span');
            removeIcon.setAttribute('data-item-index', index);
            removeIcon.innerHTML = '&#xE5CD;';
            removeIcon.classList.add('material-icons', 'remove-item');

            // Hook click event for removing items
            removeIcon.addEventListener('click', () => {
                removeListItem(index);
            });

            // Add all the individual elements to parent
            const li = document.createElement('li');
            li.classList.add('list-item');
            li.append(itemLabel);
            li.append(removeIcon);
            return li;
        };

        // Re-render todoList
        $("#listItems").html('');
        todoList.forEach((listItem, index) => {
            const listItemNode = createListItemNode(listItem, index);
            $("#listItems").append(listItemNode);
        });

        // Clear the input
        $("#addNewItem").val('');
    };

    (() => {
        $("#btnAddItem").on('click', () => {
            animateListAddMode(true);
        });

        $("#addNewItem").on('keypress', (event) => {
            if (event.originalEvent.key === 'Enter') {
                const listItemText = event.originalEvent.target.value;
                addListItem(listItemText);
                animateListAddMode(false);
            }
        });

        paint();
    })();

});
