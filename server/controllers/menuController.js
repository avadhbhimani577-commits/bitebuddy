// menuController.js

const menuItems = [];

// Create a menu item
const createMenuItem = (req, res) => {
    const newItem = req.body;
    menuItems.push(newItem);
    res.status(201).json(newItem);
};

// Read all menu items
const getMenuItems = (req, res) => {
    res.status(200).json(menuItems);
};

// Read a menu item by ID
const getMenuItemById = (req, res) => {
    const { id } = req.params;
    const item = menuItems.find(i => i.id === id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
};

// Update a menu item by ID
const updateMenuItem = (req, res) => {
    const { id } = req.params;
    const index = menuItems.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ message: 'Item not found' });
    menuItems[index] = { ...menuItems[index], ...req.body };
    res.status(200).json(menuItems[index]);
};

// Delete a menu item by ID
const deleteMenuItem = (req, res) => {
    const { id } = req.params;
    const index = menuItems.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ message: 'Item not found' });
    menuItems.splice(index, 1);
    res.status(204).send();
};

module.exports = {
    createMenuItem,
    getMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
};