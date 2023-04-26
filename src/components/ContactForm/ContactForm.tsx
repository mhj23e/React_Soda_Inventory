// Done

import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseBrand, chooseFlavor, chooseSize } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

import { useGetData } from '../../custom-hooks';

// Where do we get this from?
interface ContactFormProps {
    id?:string;
    data?:{}
}

interface ContactState {
    name: string;
    brand: string;
    flavor: string;
    size: string;
}

export const ContactForm = (props:ContactFormProps) => {
    // ask Joel about contactData and state
    const dispatch = useDispatch();
    // let { contactData, getData } = useGetData();
    const store = useStore();
    const name = useSelector<ContactState>(state => state.make);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseName(data.name));
            dispatch(chooseBrand(data.brand));
            dispatch(chooseFlavor(data.flavor));
            dispatch(chooseSize(data.size));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Input {...register('name')} name="name" placeholder='Name'/>
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <Input {...register('brand')} name="brand" placeholder='Brand'/>
                </div>
                <div>
                    <label htmlFor="flavor">Flavor</label>
                    <Input {...register('flavor')} name="flavor" placeholder='Flavor'/>
                </div>
                <div>
                    <label htmlFor="size">Size</label>
                    <Input {...register('size')} name="size" placeholder='Size'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}
