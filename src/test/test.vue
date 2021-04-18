<template>
  <el-table>
    <tr v-for="item in items" :key="item._">
      <td
        v-if="item.A"
        :rowspan="item.A instanceof Object ? item.A.rows : '1'"
        :colspan="item.A instanceof Object ? item.A.cols : '1'"
        :align="item.A instanceof Object ? item.A.align : 'center'"
      >
        <select v-if="item.A instanceof Object && item.A.editable" v-model="item.A.value" @change="onEdit(item, 'A')">
          <option v-if="item.A.value && item.A.editable">{{ item.A.value.text ? item.A.value.text : item.A.value }}</option>
          <option
            v-for="(obj, index) in item.A.editType === 'decrease' ? pelepasanCukai.taxReduction : pelepasanCukai.dutyFrees"
            :key="index"
            :value="obj"
          >{{ obj.text }}</option>
          <option />
        </select>
        <span v-if="!item.A.editable" class="pa-1">{{ item.A instanceof Object ? item.A.value : item.A }}</span>
      </td>
      <td
        v-if="item.B"
        :rowspan="item.B instanceof Object ? item.B.rows : '1'"
        :colspan="item.B instanceof Object ? item.B.cols : '1'"
        :align="item.B instanceof Object ? item.B.align : 'center'"
        ass="pa-1" >
        {{ item.B instanceof Object ? item.B.value : item.B }}
      </td>
      <td
        v-if="item.C"
        :rowspan="item.C instanceof Object ? item.C.rows : '1'"
        :colspan="item.C instanceof Object ? item.C.cols : '1'"
        :align="item.C instanceof Object ? item.C.align : 'center'"
      >
        <input
          v-if="item.C instanceof Object && item.C.editable"
          v-model="item.C.value"
          class="text-right input blue-grey lighten-5 pa-1"
          @change="onEdit(item, 'C')"
        />
        <span
          v-if="!item.C.editable"
          class="pa-1"
          :class="item.C && item.C.editType ? 'r-hand' : ''"
          @click="item.C && item.C.editType ? onViewChange(item.C.editType) : ''"
        >{{ item.C instanceof Object ? item.C.value : item.C }}</span>
        <v-btn
          v-if="!item.C || item.C && !item.C.value && !item.C.editable && item.C.editType"
          :class="item.C && item.C.editType ? 'r-hand' : ''"
          @click="item.C && item.C.editType ? onViewChange(item.C.editType) : ''"
          small
          text
          width="90%"
        />
      </td>
      <td
        v-if="item.D"
        :rowspan="item.D instanceof Object ? item.D.rows : '1'"
        :colspan="item.D instanceof Object ? item.D.cols : '1'"
        :align="item.D instanceof Object ? item.D.align : 'center'"
      >
        <input
          v-if="item.D instanceof Object && item.D.editable"
          v-model="item.D.value"
          class="text-right input pa-1 blue-grey lighten-5"
          @input="item.D.value=item.D.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
          @change="onEdit(item, 'D')"
        />
        <span
          v-if="!item.D.editable"
          class="pa-1"
          :class="item.D && item.D.editType ? 'r-hand' : ''"
          @click="item.D && item.D.editType ? onViewChange(item.D.editType) : ''"
        >{{ item.D instanceof Object ? item.D.value : item.D }}</span>
        <v-btn
          v-if="!item.D || item.D && !item.D.value && !item.D.editable && item.D.editType"
          :class="item.D && item.D.editType ? 'r-hand' : ''"
          @click="item.D && item.D.editType ? onViewChange(item.D.editType) : ''"
          small
          text
          width="90%"
        />
      </td>
      <td
        v-if="item.E"
        :rowspan="item.E instanceof Object ? item.E.rows : '1'"
        :colspan="item.E instanceof Object ? item.E.cols : '1'"
        :align="item.E instanceof Object ? item.E.align : 'center'"
      >
        <input
          v-if="item.E instanceof Object && item.E.editable"
          v-model="item.E.value"
          class="text-right input pa-1 blue-grey lighten-5"
          @input="item.E.value=item.E.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
          @change="onEdit(item, 'E')"
        />
        <span
          v-if="!item.E.editable"
          class="pa-1"
          :class="item.E && item.E.editType ? 'r-hand' : ''"
          @click="item.E && item.E.editType ? onViewChange(item.E.editType) : ''"
        >{{ item.E instanceof Object ? item.E.value : item.E }}</span>
        <v-btn
          v-if="!item.E || item.E && !item.E.value && !item.E.editable && item.E.editType"
          :class="item.E && item.E.editType ? 'r-hand' : ''"
          @click="item.E && item.E.editType ? onViewChange(item.E.editType) : ''"
          small
          text
          width="90%"
        />
      </td>
      <td
        v-if="item.F"
        :rowspan="item.F instanceof Object ? item.F.rows : '1'"
        :colspan="item.F instanceof Object ? item.F.cols : '1'"
        :align="item.F instanceof Object ? item.F.align : 'center'"
      >
        <input
          v-if="item.F instanceof Object && item.F.editable"
          v-model="item.F.value"
          class="text-right input pa-1 blue-grey lighten-5"
          @input="item.F.value=item.F.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
          @change="onEdit(item, 'F')"
        />
        <span v-if="!item.F.editable" class="pa-1">{{ item.F instanceof Object ? item.F.value : item.F }}</span>
      </td>
      <td
        v-if="item.G"
        :rowspan="item.G instanceof Object ? item.G.rows : '1'"
        :colspan="item.G instanceof Object ? item.G.cols : '1'"
        :align="item.G instanceof Object ? item.G.align : 'center'"
      >
        <input
          v-if="item.G instanceof Object && item.G.editable"
          v-model="item.G.value"
          @input="item.G.value=item.G.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
          @change="onEdit(item, 'G')"
        />
        <span v-if="!item.G.editable" class="pa-1">{{ item.G instanceof Object ? item.G.value : item.G }}</span>
      </td>
      <td
        v-if="item.H"
        :rowspan="item.H instanceof Object ? item.H.rows : '1'"
        :colspan="item.H instanceof Object ? item.H.cols : '1'"
        :align="item.H instanceof Object ? item.H.align : 'center'"
      >
        <input
          v-if="item.H instanceof Object && item.H.editable"
          v-model="item.H.value"
          class="text-right input pa-1 blue-grey lighten-5"
          @input="item.H.value=item.H.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
          @change="onEdit(item, 'H')"
        />
        <span v-if="!item.H.editable" class="pa-1">{{ item.H instanceof Object ? item.H.value : item.H }}</span>
      </td>
    </tr>
  </el-table>
</template>

<script>
export default {
}
</script>

<style lang="scss">
</style>
