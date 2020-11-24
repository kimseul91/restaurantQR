// THIS FUNCTION IS ONLY USED TO GENERATE TEST DATA

async function getMenuItems() {
  // let menuItems = [];

  // data.map(result => {
  //     result.result.data.map(item => {
  //         menuItems.push({
  //             name: item.menu_item_name,
  //             description: item.menu_item_description,
  //             subsection: item.subsection
  //         });
  //         // console.log(item.menu_item_name);
  //     })
  // })
  // let subsectionsInMenu = {};
  // menuItems.filter(item => {
  //     subsectionsInMenu[`${item.subsection}`] = [];
  // });

  // menuItems.map(item => {
  //     subsectionsInMenu[`${item.subsection}`].push(
  //         {
  //             "name" : item.name,
  //             "description": item.description,
  //         });
  // })
  // let subsectionsInMenuObject = {};
  // menuItems.filter(item => {
  //     subsectionsInMenuObject[`${item.subsection}`] = {};
  // });

  // menuItems.map(item => {
  //     subsectionsInMenuObject[`${item.subsection}`][`${item.name}`] =
  //         {
  //             "description": item.description,
  //             "price" : Math.random()*5,
  //         };
  // })
  // // subsectionsInMenu.map(sub => console.log(sub));
  // console.log(subsectionsInMenu)
  // fb.postData(subsectionsInMenu);
  // fb.postDataObject(subsectionsInMenuObject);

  // Using XYZ api to get menu
  // data.map(result => {
  //     console.log(result.result.data);
  // })

  let page = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  // let page = [1];

  const yuo = async (pg) => {
    const data = await axios.get(
      `https://us-restaurant-menus.p.rapidapi.com/restaurant/441663/menuitems?page=${pg}`,
      {
        params: {},
        headers: {
          "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
          "x-rapidapi-key":
            "0654d2cef3mshfee87c42ba18e1dp101920jsnbc82bd0af8e3",
        },
      }
    );
    return data;
  };
  let totalResult = await Promise.all(
    page.map(async (id) => {
      return await yuo(id);
    })
  );

  let menuItems = [];

  totalResult.map((result) => {
    result.data.result.data.map((item) => {
      menuItems.push({
        name: item.menu_item_name,
        description: item.menu_item_description,
        subsection: item.subsection,
      });
    });
  });
  // use this if you want the menu to be in ARRRAY!!!!
  // let subsectionsInMenu = [];
  // menuItems.filter(item => {
  //     subsectionsInMenu[`${item.subsection}`] = {};
  // });
  // console.log(subsectionsInMenu);
  // menuItems.map(item => {
  //     subsectionsInMenu[`${item.subsection}`].push(
  //         {
  //             "name" : item.name,
  //             "description": item.description,
  //         });
  // })

  //** WE AGREED ON THE MENU TO BE MAP (OBJECT) ///
  let subsectionsInMenuObject = {};
  menuItems.filter((item) => {
    subsectionsInMenuObject[`${item.subsection}`] = {};
  });

  menuItems.map((item) => {
    subsectionsInMenuObject[`${item.subsection}`][`${item.name}`] = {
      description: item.description,
      price: Math.random() * 5,
    };
  });
  // subsectionsInMenu.map(sub => console.log(sub));
  // fb.postData(subsectionsInMenu);
  fb.postDataObject(subsectionsInMenuObject);
}
