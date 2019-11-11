<template>
  <div id="Hello-Ts">
      <h2>{{msg}}</h2>
      <ul v-for="feature in features" :key = feature>
          <li>{{feature}}</li>
      </ul>

  </div>
</template>
<script lang="ts">
import {Component,Prop,Vue, Emit} from 'vue-property-decorator';

@Component
export default class HelloTs extends Vue {
    features : string[] = ['aa','bb','cc']
    //prop 
    @Prop({ type:String, required:true})
    private msg : string;

    // @Emit('onEmit')
    // private addFeature(e:any){

    // }

}
</script>
