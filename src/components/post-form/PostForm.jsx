import React, {useCallback} from "react";
import { useForm } from "react-hook-form";
import Button from "../Button.jsx"
import Input from "../Input.jsx"
import RTE from "../header/RTE.jsx";
import Select from "../Select.jsx";
import appwriteService from "../../auth/configDB.js"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({post}) {
    //we might recieve a form so we use that to edit it.
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        //we need these to handle useForm
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submitAction = async(data) => {}

    const slugTransform = useCallback((value) => {

        //anyone can call slugTransform method but we need to be passed a value. what is it?
        //its the value of the form we're using.
        if (value && typeof value === "string")
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')
    }, [])
    React.useEffect(() =>{
        watch ((value, {name}) => {if (name === "title") {
            setValue("slug", slugTransform(value.title), {shouldValidate: true})
        }
    })
    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submitAction)} //this is how Powerful PostForm works which we installed
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2"
            >
                <Input 
                label="Title"
                placeholder="Title"
                className="mb-4"
                {...register("title", {required:true})}
                />
                <Input
                label ="slug"
                placeholder="slug"
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
                />
                <RTE
                label= "Content: "
                name= "content"
                control={control}
                //specifally designed of Input fields that are 3rd party or custom made Inputs
                defaultValue= {getValues("content")}
                />
                
            </div>
            <div className="1/3 px-2">
            <Input
            label="Featured Image"
            type="file"
            className="mb-4"
            //these are all props which we can pass on and even in custom Components
            accept="image/png, image/jpg, image/jpeg"
            {...register("image", {required: !post})}
            />
            {post && (
                <div className="w-full mb-4">
                    <img src= {appwriteService.getFilePreview(post.featuredImage)} 
                    //using appwrite to get featuredImage of posts.
                    alt={post.title} 
                    className="rounded-lg"/> 
                </div>
            )}
            </div>
        </form>
    )
    //handle submit shouldnt be used directly like         <form onSubmit={handleSubmit}></form>
    // we are using submitAction like this
    //Input is my custom component so suggestions won't pop
}