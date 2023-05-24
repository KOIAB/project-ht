<template>
  <div>
    <div class="cart-header">
        <span>{{title}}</span>
        <svg t="1684309870645" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2843" width="16" height="16"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m36.571429 268.190476v292.571428h-73.142858V438.857143h73.142858z m0-121.904762v73.142857h-73.142858v-73.142857h73.142858z" p-id="2844" fill="#8a8a8a"></path></svg>
    </div>
    <div class="cart-content">{{count}}</div>
    <div class="cart-charts">
        <slot name='charts'></slot>
    </div>
    <div class="cart-footer">
        <slot name='footer'></slot>
    </div>
  </div>
</template>

<script>
export default {
    name:'Detail',
    props:['title','count'],
}
</script>

<style scoped>
.cart-header{
    display: flex;
    justify-content: space-between;
    color: #a7a7a7;
    font-size: 14px;
}
.cart-content{
    margin: 10px 0;
    font-size: 30px;
}
.cart-footer{
    border-top: 1px solid #eee;
     padding: 10px 0 0 0;
    color: rgb(80, 78, 78);
}
.cart-charts {
    height: 50px;
}
.cart-charts .text{
    padding: 20px 0 10px 0;
    font-size: 14px;
    color: rgb(80, 78, 78);
}
.cart-charts svg{
    margin-right: 10px;
}
.cart-footer svg{
   margin-right: 10px;
}
</style>