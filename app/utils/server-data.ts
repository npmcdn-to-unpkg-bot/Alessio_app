export class ServerData {
  createDb() {
    let items = [
      { id: 0, type: 'g0', name: 'Technology', parentId: '', childrenIds: '' },
      { id: 1, type: 'g0', name: 'Music', parentId: '', childrenIds: '' },
      { id: 2, type: 'g0', name: 'Fashion', parentId: '', childrenIds: '' },
      { id: 3, type: 'g0', name: 'Sport', parentId: '', childrenIds: '' },
      { id: 4, type: 'p', editables: 
        { department: 'Technology', name: 'Phone', price: 100.00 }},
      { id: 5, type: 'p', editables: 
        { department: 'Technology', name: 'PC', price: 1000.00 }},
      { id: 6, type: 'p', editables: 
        { department: 'Music', name: 'Guitar', price: 1500.0 }},
      { id: 7, type: 'p', editables: 
        { department: 'Music', name: 'Piano', price: 10000.00 }},
      { id: 8, type: 'p', editables: 
        { department: 'Fashion', name: 'Jacket', price: 500.00 }},
      { id: 9, type: 'p', editables: 
        { department: 'Fashion', name: 'Suit', price: 2500.00 }},
      { id: 10, type: 'p', editables: 
        { department: 'Sport', name: 'Ball', price: 10.00 }},
      { id: 11, type: 'p', editables: 
        { department: 'Sport', name: 'Bycicle', price: 800.00 }},
    ];
    return {items};
  }
}
