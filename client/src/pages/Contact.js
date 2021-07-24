import React, { useState } from 'react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const { name, email, message } = formState;

    function handleChange(e) {
        setFormState({...formState, [e.target.name]: e.target.value })
      }
      
      console.log(formState);

    return (
        <main className='flex-row justify-center mb-4'>
        <div className='col-12 col-md-6'>
            <div className='card'>
                <h4 className='card-header'>Contact Us</h4>
                <div className='card-body'>
                        <form>
                            
                            <input
                                className='form-input'
                                placeholder='Name'
                                name='name'
                                type='name'
                                id='name'
                                defaultValue={name}
                                onChange={handleChange}
                            />
                            <input
                                className='form-input'
                                placeholder='Email'
                                name='email'
                                type='email'
                                id='email'
                                defaultValue={email}
                                onChange={handleChange}
                            />
                            <textarea
                                className='form-input'
                                placeholder='Message'
                                name='Message'
                                type='Message'
                                id='message'
                                defaultValue={message}
                                onChange={handleChange}
                                />
                            <button className='btn d-block w-100' type='submit'>Submit</button>
                        </form>

                </div>
            </div>
        </div>
    </main>
    )
}

export default Contact;
