---
title: Components
description: Browse the components in Neobrut Vue core.
---

These components are exported from `@neobrut-vue/core` 0.5.0. Start with the interactive pages for [Button](/neobrut-vue/button/), [Input](/neobrut-vue/input/), [Select](/neobrut-vue/select/), [Switch](/neobrut-vue/switch/), [Accordion](/neobrut-vue/accordion/), [Tabs](/neobrut-vue/tabs/), [Dialog](/neobrut-vue/dialog/), and [Forms](/neobrut-vue/forms/). The [full gallery](https://neobrut.avrdu.de/#gallery) has the rest of the kit.

| Purpose | Components |
| --- | --- |
| Actions and surfaces | `NbButton`, `NbButtonGroup`, `NbCopyButton`, `NbToggle`, `NbCard`, `NbAlert`, `NbBadge` |
| Forms | `NbCheckbox`, `NbCombobox`, `NbFieldset`, `NbInput`, `NbInputGroup`, `NbNumberInput`, `NbPinInput`, `NbRadioGroup`, `NbRating`, `NbSelect`, `NbSelectItem`, `NbSlider`, `NbSwitch`, `NbTagsInput`, `NbTextarea`, `NbToggleGroup`, `NbToggleGroupItem` |
| Navigation | `NbBreadcrumbs`, `NbNavigationMenu`, `NbPagination`, `NbStepper`, `NbStepperItem`, `NbTabs`, `NbTabsList`, `NbTabsTrigger`, `NbTabsContent` |
| Overlays | `NbAlertDialog`, `NbCommand`, `NbContextMenu`, `NbDialog`, `NbDropdownMenu`, `NbHoverCard`, `NbPopover`, `NbSheet`, `NbToast`, `NbTooltip` |
| Data display | `NbAccordion`, `NbAccordionItem`, `NbAvatar`, `NbCollapsible`, `NbEmptyState`, `NbMeter`, `NbProgress`, `NbSkeleton`, `NbSpinner`, `NbTable`, `NbTimeline`, `NbTimelineItem` |
| Inline and layout | `NbLink`, `NbKbd`, `NbMarker`, `NbAspectRatio`, `NbScrollArea`, `NbSeparator` |

## Actions and links

Use a button for an action and a link for navigation:

```vue
<script setup lang="ts">
import { NbButton, NbLink } from '@neobrut-vue/core'
</script>

<template>
  <NbButton variant="accent">Save changes</NbButton>
  <NbLink href="/settings">Settings</NbLink>
</template>
```

`NbCopyButton` copies text with the browser Clipboard API, which needs HTTPS or localhost:

```vue
<script setup lang="ts">
import { NbCopyButton } from '@neobrut-vue/core'
</script>

<template>
  <NbCopyButton text="npm install @neobrut-vue/core" label="Copy install command" />
</template>
```

## Tabs and disclosure

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger } from '@neobrut-vue/core'

const activeTab = ref('overview')
</script>

<template>
  <NbTabs v-model="activeTab">
    <NbTabsList>
      <NbTabsTrigger value="overview">Overview</NbTabsTrigger>
      <NbTabsTrigger value="details">Details</NbTabsTrigger>
    </NbTabsList>
    <NbTabsContent value="overview">The short version.</NbTabsContent>
    <NbTabsContent value="details">The full story.</NbTabsContent>
  </NbTabs>
</template>
```

For complete props and event signatures, use the [source components](https://github.com/avr6ude/neobrut-vue/tree/main/src/components) until dedicated API pages are added.
