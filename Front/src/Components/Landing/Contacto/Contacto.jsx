import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser'
import style from "./Contacto.module.css"
import Swal from "sweetalert2";

const Contacto = () => {

    const [input, setInput] = useState({
        user_name: '',
        user_email: '',
        user_mensaje: ''
    });

    const sendEmail = (event) => {
        event.preventDefault();

        emailjs.sendForm('service_umhpsx4', 'template_f767xpn', event.target, 'VWtdKw_LCsI0zG4ZK')
            .then(response => {
                console.log(response);
                Swal.fire({
                    text: 'MENSAJE ENVIADO',
                    icon: "success",
                  });
                setInput({
                    user_name: '',
                    user_email: '',
                    user_mensaje: ''
                });
            })
            .catch(error => console.log(error))

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    return (

        <div className={style.container}>

            <Link to="/"><button className={style.volver}>Volver</button></Link>

            <h1 className={style.titulo}>Envianos tu mensaje</h1>

            <div className={style.borde}>


                <form onSubmit={sendEmail} className={style.form}>


                    <div className={style.div1}>
                        <label className={style.nombre}>Tu nombre: </label> <input
                            type="text"
                            name="user_name"
                            value={input.user_name}
                            onChange={handleInputChange}
                            className={style.input1}
                        >
                        </input>
                    </div>

                    <div>
                        <label className={style.email}>Tu correo electrónico: </label><input
                            type="email"
                            name="user_email"
                            value={input.user_email}
                            onChange={handleInputChange}
                            className={style.input2}
                        >
                        </input>
                    </div>

                    <div>
                        <p className={style.mensaje}>Mensaje: </p><textarea
                            name="user_mensaje"
                            id=""
                            cols="30"
                            rows="10"
                            value={input.user_mensaje}
                            onChange={handleInputChange}
                            className={style.input3}
                        >
                        </textarea>
                    </div>

                    <button type="submit" className={style.send}>Enviar Mensaje</button>
                </form>

            </div>


        </div>
    )

}

export default Contacto;
