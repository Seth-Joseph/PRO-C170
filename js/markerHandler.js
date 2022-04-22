
AFRAME.registerComponent('markerhandler',{
    init: async function(){
        this.el.addEventListener("markerFound",(e)=>{
            this.handleMarkerFoundEvent();
        });
        this.el.addEventListener("markerLost",(e)=>{
            this.handleMarkerLostEvent();
        });
    },
    handleMarkerFoundEvent: function(){
        var buttonDiv = document.getElementById('button-div');
        buttonDiv.style.display = 'flex';

        var rBtn = document.getElementById('rating-button');
        rBtn.addEventListener('click',(e)=>{
            Swal.fire({
                title: 'Enter your feedback!',
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText:'Submit',
                confirmButtonColor: '#3085d6',
                showLoaderOnConfirm: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                      icon:'success',
                      title:'Thank You for your Feedback!',
                      showConfirmButton: false,
                      timer:2000
                  })
                }
              })
        });

        var oBtn = document.getElementById('order-button');
        oBtn.addEventListener('click',(e)=>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Yes, Order Now!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                      icon:'success',
                      title:'Order Completed!',
                      confirmButtonColor: '#3085d6',

                  })
                }
              })
        });
    },
    handleMarkerLostEvent: function(){
        var buttonDiv = document.getElementById('button-div');
        buttonDiv.style.display = 'none';
    }
});