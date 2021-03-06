
import React, { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import { getProds } from '../../mocks/FakeApi';
import { useParams } from 'react-router-dom';
import { db } from "../../firebase/firebase";
import { getDocs, collection, query } from "firebase/firestore";

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    useEffect(() => {
        const productsCollection = collection(db, 'productos');
        getDocs(productsCollection)
        .then(result => {
            const lista = result.docs.map(product => {
                return{
                    id: product.id,
                    ...product.data,
                }
            })
            setProducts(lista);
        }

        )

        }, [categoryId ]);


        return (
            <div>
                {loading ? (
                    <h2>Cargando...</h2>
                ) : (
                    <>
                        <ItemList items={products} />
                    </>
                )}
            </div>
        );
    };
    
    export default ItemListContainer;