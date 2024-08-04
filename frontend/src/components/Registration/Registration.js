import React from 'react'

const Registration = () => {
  return (
    <>
    <div className='flex  justify-center items-center h-screen w-full bg-gray-100'>
        <div className='flex flex-col h-4/5 w-1/3  items-center	'>
            <h1 className = 'font-sans text-3xl font-bold	'>Create a new account!</h1>
            <span>Or</span>
            <a href="/login" className='text-blue-600'>Login</a>

            <div className='flex flex-col bg-white  w-11/12 mt-5 rounded-md shadow-md'>
                <div className='my-6 mx-10 flex flex-col '>
                    <label htmlFor="" className='text-sm font-semibold mb-1' >Name</label>
                    <input type="text" className='border-2 py-2 px-3 text-sm mb-4 rounded' placeholder='Enter your full name' />

                    <label htmlFor="" className='text-sm font-semibold mb-1'>Username</label>
                    <input type="text" className='border-2 py-2 px-3 text-sm mb-4 rounded' placeholder='Enter username' />

                    <label htmlFor="" className='text-sm font-semibold mb-1'>Phone</label>
                    <input type="text" className='border-2 py-2 px-3 text-sm mb-4 rounded' placeholder='Enter your phone number ' />

                    <label htmlFor="" className='text-sm font-semibold mb-1'>Email Address</label>
                    <input type="text" className='border-2 py-2 px-3 text-sm mb-4 rounded' placeholder='user@example.com' />

                    <label htmlFor="" className='text-sm font-semibold mb-1'>Password</label>
                    <input type="text" className='border-2 py-2 px-3 text-sm mb-4 rounded' placeholder='' />

                    <label htmlFor="" className='text-sm font-semibold mb-1'>Confirm Password</label>
                    <input type="text"  className='border-2 py-2 px-3 text-sm mb-4 rounded' placeholder='' />

                    <button className='bg-blue-700 my-2 py-2 text-white rounded-md text-sm font-semibold'>Create Account</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Registration
