<template>
  <div class="scrollable-x">
    <b-table :items="items" :fields="tableFields" bordered ref="table" primary-key="id"
    ></b-table>
  </div>
</template>

<style lang="sass">
.scrollable-x
  overflow-x: scroll
</style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IDatiCauzione } from '@/store/types'

@Component
export default class TabellaCauzioni extends Vue {
  @Prop({
    required: true,
    type: Array
  })
  items: IDatiCauzione[] | undefined

  @Prop({
    required: true,
    type: Array
  })
  readonly tableFields: any
}
</script>
