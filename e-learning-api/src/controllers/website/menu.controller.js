const MenuModal=require('../../models/Menu');
require('dotenv').config();

exports.viewMenu = async (request, response) => {
    try {

        const menu = await MenuModal.find({
            deletedAt: null
        });

        // 🔹 Get parent menus
        const parentMenu = menu.filter(menu_item =>
            menu_item.parentId == null
        );

        // 🔹 Create nested structure
        const nestedMenu = parentMenu.map(parent => {

            const children = menu.filter(menu_item =>
                menu_item.parentId &&
                menu_item.parentId.toString() === parent._id.toString()
            );

            return {
                _id: parent._id,
                name: parent.name,
                slug: parent.slug,
                link: parent.link,
                order: parent.order,
                children: children
            };
        });

        const output = {
            _status: true,
            _message: 'Menu data',
            _data: nestedMenu
        };

        response.send(output);

    } catch (error) {

        const output = {
            _status: false,
            _message: 'Something went wrong',
            _error: error.message
        };

        response.send(output);
    }
};
