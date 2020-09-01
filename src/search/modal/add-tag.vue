<template>
  <el-dialog
    title="批量添加"
    :visible="visible"
    width="500px"
    destroy-on-close
    class="dialog-add-tag"
    @close="cancelAdd"
  >
    <el-form ref="form" :model="tagForm" label-position="left" label-width="80px" size="small">
      <el-form-item label="标签" :required="true">
        <el-select
          v-model="tagForm.tags"
          multiple
          filterable
          allow-create
          placeholder="请选择标签">
          <el-option
            v-for="tag in tagOptions"
            :key="tag.id"
            :label="tag.name"
            :value="tag.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="small" @click="cancelAdd">取消</el-button>
      <el-button type="primary" size="small" :disabled="tagForm.tags.length === 0" @click="confirmTag">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import apiService from '../search.service';

export default {
  name: 'AddTagModal',
  props: ['visible'],
  data: () => {
    return {
      tagOptions: [],
      tagForm: {
        tags: [],
      },
    };
  },
  mounted() {
    this.getTagList();
  },
  methods: {
    getTagList() {
      apiService.getTagList()
      .then((tags) => {
        this.tagOptions = tags.data || [];
      })
      .catch(() => {});
    },
    confirmTag() {
      this.$emit('addTagChange', this.getSelectedTags());
    },
    cancelAdd() {
      this.$emit('cancel', 'addTag');
    },
    getSelectedTags() {
      selectedTags = [];
      this.tagForm.tags.forEach((tag) => {
        const selectedOption = this.tagOptions.find((option) => option.id === tag);
        if (selectedOption) {
          selectedTags.push(selectedOption);
        } else {
          selectedTags.push({
            id: null,
            name: tag,
          });
        }
      });

      return selectedTags;
    },
  },
}
</script>

<style lang="scss" scoped>

.dialog {

  &-add-tag {
    .el-select {
      width: 100%;
    }
  }
}
</style>