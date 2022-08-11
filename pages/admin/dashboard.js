import React from 'react';
import Adminlayout from '../../components/admin/adminlayout';
import Createform from '../../components/admin/category/createform';
const Dashboard = () => {



        return (
       <Adminlayout>
        <div>

<div>

<div>
     <h1 className=' text-center text-2xl font-bold'>
        Admin Dashboard
     </h1>
</div>


<div>
    <div>
        <Createform />
    </div>
</div>



</div>


        </div>
        </Adminlayout>
    );
}

export default Dashboard;
