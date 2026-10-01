---
title: Forms
description: Bind form components and validation with Vue.
---

Form controls use Vue `v-model`, expose labels, hints, and errors, and forward relevant native attributes. Import the stylesheet once as shown in [Getting started](/neobrut-vue/getting-started/).

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NbCheckbox, NbInput, NbSelect, NbSelectItem, NbSwitch } from '@neobrut-vue/core'

const name = ref('')
const tone = ref('primary')
const alerts = ref(true)
const accepted = ref(false)
</script>

<template>
  <form>
    <NbInput v-model="name" label="Name" required placeholder="Ada Lovelace" />
    <NbSelect v-model="tone" label="Favorite tone">
      <NbSelectItem value="primary">Electric blue</NbSelectItem>
      <NbSelectItem value="accent">Bubblegum pink</NbSelectItem>
    </NbSelect>
    <NbSwitch v-model="alerts" label="Launch alerts" />
    <NbCheckbox v-model="accepted" label="I accept the terms" />
  </form>
</template>
```

## Validation libraries

The core is form-library agnostic. For example, with VeeValidate, bind `defineField` attrs and pass its error to the component:

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { NbButton, NbInput } from '@neobrut-vue/core'

const { defineField, errors, handleSubmit } = useForm({
  initialValues: { workspace: '' },
  validationSchema: {
    workspace: (value: string) => value.trim().length >= 3 || 'Use at least three characters.',
  },
})
const [workspace, workspaceAttrs] = defineField('workspace')
const submit = handleSubmit(({ workspace }) => console.log(workspace))
</script>

<template>
  <form @submit="submit">
    <NbInput v-model="workspace" v-bind="workspaceAttrs" name="workspace" label="Workspace" :error="errors.workspace" />
    <NbButton type="submit">Save</NbButton>
  </form>
</template>
```

See the [live forms demo](https://neobrut.avrdu.de/#gallery) for searchable, numeric, segmented, and validation examples.
