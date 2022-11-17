import {RouterContext} from "oak";
import {BookCollection, UserCollection} from "../db/database.ts";
import {ObjectId} from "mongo"

type UpdateCartContext = RouterContext<"/updateCart", Record<string | number, string | undefined>, Record<string, any>>

export const updateCart = async (context: UpdateCartContext) => {
    try {
        const result = context.request.body({ type: "json" });
        const value = await result.value;
        if (!(value?.id_book && value?.id_user)) {
            context.response.status = 400;
            context.response.body = { message: "Bad Request" }
            return;
        }
        const user = await UserCollection.findOne({ _id: new ObjectId(value.id_user) })
        const book = await BookCollection.findOne({ _id: new ObjectId(value.id_book) })
        if (! (user)) {
            context.response.status = 404;
            context.response.body = { message: "User not found" };
            return
        }
        if (!(book)) {
            context.response.status = 404;
            context.response.body = { message: "Book not found" };
            return
        }
        const found= user.cart.find((element: ObjectId) => element.toString() === value.id_book);
        if (found) {
            context.response.status = 409;
            context.response.body = { message: "Book already in cart" };
            return
        }
        await UserCollection.updateOne({ _id: user._id }, {
            $push: {
                cart: book._id
            }
        }) 
        context.response.body = { message: "Book added to user cart" };
    } catch (error) {
        console.error(error)
    }
};