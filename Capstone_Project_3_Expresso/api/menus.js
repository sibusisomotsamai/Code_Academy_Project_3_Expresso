const express = require('express');
const menusRouter = express.Router();
const menuItemsRouter = require('./menuitems');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


menusRouter.param('menuId', (req, res, next, menuId) => {
	const sql = 'SELECT * FROM Menu WHERE Menu.id = $menuId';
	const values = { $menuId: menuId };

	db.get(sql, values, (error, menu) => {
		if (error) {
			next(error)
		} else if (menu) {
			req.menu = menu;
			next();
		} else {
			res.sendStatus(404);
		}
	});
});


menusRouter.use('/:menuId/menu-items', menuItemsRouter);


menusRouter.get('/', (req, res, next) => {
	db.all('SELECT * FROM Menu', (error, menus) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json({ menus: menus });
		}
	});
});


menusRouter.post('/', (req, res, next) => {
	const title = req.body.menu.title;

	if (!title) {
		return res.sendStatus(400);
	}

	const sql = 'INSERT INTO Menu (title) Values ($title)';
	const values = { $title: title };

	db.run(sql, values, function(error) {
		if (error) {
			next(error);
		} else {
			db.get(`SELECT * FROM Menu WHERE Menu.id = ${this.lastID}`,
        (error, menu) => {
				res.status(201).json({ menu: menu });
			});
		}
	})
});


menusRouter.get('/:menuId', (req, res, next) => {
	res.status(200).json({ menu: req.menu });
});


menusRouter.put('/:menuId', (req, res, next) => {
	const title = req.body.menu.title;

	if (!title) {
		return res.sendStatus(400);
	} else {
		const sql = `UPDATE Menu SET title = $title WHERE Menu.id = $menuId`;
		const values = {
			$title: title,
			$menuId: req.params.menuId
		};

		db.run(sql, values, (error) => {
			if (error) {
				next(error);
			} else {
				db.get(`SELECT * FROM Menu WHERE Menu.id = ${values.$menuId}`, (error, menu) => {
					res.status(200).json({ menu: menu });
				});
			}
		});
	}
});


menusRouter.delete('/:menuId', (req, res, next) => {
	const aMenuId = req.params.menuId;

	db.get(`SELECT * FROM MenuItem WHERE MenuItem.menu_id = ${aMenuId}`, (error, item) => {
		if (error) {
			next(error);
		} else if (item) {
			res.sendStatus(400);
		} else {
			db.run(`DELETE FROM Menu WHERE Menu.id = ${aMenuId}`, (error, menu) => {
				if (error) {
					next(error);
				} else {
					res.status(204).send();
				}
			});
		}
	});
});

module.exports = menusRouter;
