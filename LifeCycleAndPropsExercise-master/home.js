import React, { Component } from 'react';
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
        detail: '',
        itemList: [],
        };
    }

onInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
}

addItem = e => {
    const { detail, itemList } = this.state;
    const arr = `${detail}`.replace(/'/ig, "").split("-");
    const itemName = arr[0];
    const itemPrice = arr[1];
    itemList.push({
    name: itemName,
    price: itemPrice,
    quantity: 1,
});

this.setState({
    itemList,
    detail: ''
});
}

deleteItem = index => {
    const { itemList } = this.state;
    itemList.splice(index, 1);
    this.setState({ itemList });
};

increasequantity = index => {
    const{ itemList } = this.state;
    itemList[index].quantity++;
    this.setState({itemList});
}

decreasequantity = index => {
    const{ itemList } = this.state;
    itemList[index].quantity--;
    this.setState({itemList});
}

render() {
    const { detail, itemList } = this.state;
    let totalPrice = 0;
    const itemMarkUp = itemList.map((item, index) => {
    if(item.quantity && item.price){
        totalPrice += (item.quantity * item.price);
    }
    return (
        <li key={`item-${index}`}>{item.name}  ==>>  {item.quantity}  *  {item.price}  =  {item.price*item.quantity}
        <input type="button" value="Cancel Item" onClick={(e) => this.deleteItem(index)} />       
        <input type="button" value="Increase Quantity" onClick={() => this.increasequantity(index)} />    
        <input type="button" value="Decrease Quantity" onClick={() => this.decreasequantity(index)} />   
        </li>
    );
});
return(

<div>
        <header className="heading">
            <h1><b>Cart Application</b></h1>
            <h2>My Cart</h2>
            <h4>Enter Item and Price seperated by a (hyphen) - ,Like ItemName-50</h4>
            
        </header>
        <main className="content-wrapper">
            <form className="form-group">
                <div className="form-control">
                    <input name="detail" className="text" value={detail} 
                     type="text" onChange={(e) => this.onInputChange(e)} />
                    <input type="button" className="button" value="Add Item" 
                    onClick={(e) => this.addItem(e)} disabled={!detail} /> 
                </div>
                <ul className="row">
                  {itemMarkUp}  
                </ul>
            </form>
        </main>
        <footer className="totalprice"> 
         <h2>Total:{totalPrice}</h2>
        </footer>
    </div>

);
}
}
export default Table;