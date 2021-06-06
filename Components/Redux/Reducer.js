const initialState={
 inCart:0,
 Items:[],
 Location:'',
 checkoutAmount:0,
 isLoaded:true,
}

export const mainReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "Locate":{
            state.Location=action.payload
            console.log(state.Location[0])
            return {...state,Location:state.Location}
        }
        case "Load":
            return {...state,isLoaded:!state.isLoaded}
        case "ADD_TO_CART":
            console.log(state.Items)
            var temp=false;
            var index=0;
            let reinCart=state.inCart
            let tempArr=state.Items
            tempArr.find((Item)=>{
                if(Item.id==action.payload.ID){
                   return temp=true;
                }
                index++
              })
            if(temp==true){
                tempArr[index].quantity=tempArr[index].quantity+1
                state.checkoutAmount=state.checkoutAmount+(tempArr[index].price);
            }
             else{
             tempArr.push({id:action.payload.ID,quantity:1,category:action.payload.category,title:action.payload.title,price:action.payload.price,imageurl:action.payload.imageurl})
             state.checkoutAmount=state.checkoutAmount+action.payload.price
             reinCart=reinCart+1
             }
        return {...state,inCart:reinCart,Items:tempArr,checkoutAmount:state.checkoutAmount}
        case "MINUS_FROM_CART":
             temp=false;
             index=0;
             tempArr=state.Items
             reinCart=state.inCart
             tempArr.find((Item)=>{
                //  index++;
                //  return Item.id==action.payload.ID
             if(Item.id==action.payload.ID){
                    return temp=true;
                }
                index++
             })
            if(temp==true){
                if( tempArr[index].quantity==1)
                {
                   reinCart=reinCart-1
                   state.checkoutAmount=state.checkoutAmount-(tempArr[index].price);
                   tempArr.splice(index,1)
                }
                else{
                tempArr[index].quantity=tempArr[index].quantity-1
                state.checkoutAmount=state.checkoutAmount-(tempArr[index].price);
                }
            }
        return {...state,inCart:reinCart,Items:tempArr,checkoutAmount:state.checkoutAmount}
        default:
            return state
    }
}