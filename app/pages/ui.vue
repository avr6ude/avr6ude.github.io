<script setup lang="ts">
import { ref } from 'vue'
import {
  NbBadge,
  NbButton,
  NbButtonGroup,
  NbCard,
  NbKbd,
  NbLink,
  NbMarker,
  NbSeparator,
  NbToggle,
} from '@neobrut-vue/core'
import { NuxtLink } from '#components'

const noteOpen = ref(false)
const pinned = ref(false)

useSeoMeta({
  title: 'UI lab — avrdu.de',
  description: 'A small showcase of the neo-brutalist primitives used by avrdu.de.',
})
</script>

<template>
  <div class="ui-page page-section">
    <h1 class="display-title">ui lab.</h1>
    <p class="ui-page__lede">A living reference for the pieces from <code>@neobrut-vue/core</code> that make this site loud, tactile, and slightly inconvenient in a good way.</p>
    <NbSeparator />

    <section class="ui-grid" aria-label="UI component examples">
      <NbCard tone="primary">
        <template #header><span class="ui-label">buttons</span></template>
        <div class="ui-row">
          <NbButton variant="primary" @click="noteOpen = true">open note</NbButton>
          <NbButton variant="accent" size="sm">small noise</NbButton>
          <NbButton variant="ghost">ghost mode</NbButton>
        </div>
        <p v-if="noteOpen" class="ui-feedback" role="status">the button works. astonishing.</p>
      </NbCard>

      <NbCard tone="secondary">
        <template #header><span class="ui-label">badges</span></template>
        <div class="ui-row">
          <NbBadge tone="primary">primary</NbBadge>
          <NbBadge tone="accent">accent</NbBadge>
          <NbBadge tone="paper">paper</NbBadge>
          <NbBadge tone="ink">ink</NbBadge>
        </div>
      </NbCard>

      <NbCard tone="paper" class="ui-card--wide">
        <template #header><span class="ui-label">cards</span></template>
        <div class="ui-card-copy">
          <div>
            <p class="ui-card-copy__mark" aria-hidden="true">✦</p>
            <h2>physical pixels.</h2>
          </div>
          <p>Hard borders, offset shadows, and a paper palette shared by every page.</p>
        </div>
      </NbCard>

      <NbCard tone="primary" class="ui-card--wide">
        <template #header><span class="ui-label">inline actions</span></template>
        <div class="ui-inline-copy">
          <p>
            <NbLink :as="NuxtLink" to="/about/" tone="ink">Links</NbLink>
            stay loud, <NbMarker tone="primary">markers</NbMarker> call attention, and shortcuts get a proper keycap:
            <NbKbd size="sm">⌘ K</NbKbd>
          </p>
          <div class="ui-inline-actions">
            <NbButtonGroup label="Note actions">
              <NbButton size="sm">save</NbButton>
              <NbButton variant="secondary" size="sm">share</NbButton>
            </NbButtonGroup>
            <NbToggle v-model="pinned" size="sm" tone="primary" label="Pin this note">
              {{ pinned ? 'pinned' : 'pin note' }}
            </NbToggle>
          </div>
        </div>
      </NbCard>
    </section>
  </div>
</template>

<style scoped>
.ui-page { max-width: var(--site-size-content); margin: 0 auto; }
.ui-page__lede { max-width: 48ch; margin: var(--site-space-8) 0 var(--site-space-12); font-size: var(--site-font-ui-lede); line-height: var(--site-leading-body); }
.ui-page__lede code { font-family: var(--nb-font-mono); font-size: var(--site-font-inline); }
.ui-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--site-space-8); }
.ui-card--wide { grid-column: 1 / -1; }
.ui-label { font-family: var(--nb-font-mono); font-size: var(--site-font-meta); font-weight: var(--site-weight-bold); letter-spacing: var(--site-tracking-label); text-transform: uppercase; }
.ui-row { display: flex; flex-wrap: wrap; gap: var(--site-space-3); align-items: center; }
.ui-feedback { margin: var(--site-space-4) 0 0; font-family: var(--nb-font-mono); font-size: var(--site-font-control); font-weight: var(--site-weight-strong); }
.ui-card-copy { display: flex; align-items: end; justify-content: space-between; gap: var(--site-space-8); }
.ui-card-copy__mark { margin: 0; font-size: var(--site-size-ui-mark); line-height: var(--site-leading-mark); }
.ui-card-copy h2 { margin: var(--site-space-3) 0 0; font-family: var(--nb-font-display); font-size: var(--site-size-ui-card); line-height: var(--site-leading-ui-card); letter-spacing: var(--site-tracking-display); }
.ui-card-copy > p { max-width: 22ch; margin: 0; font-size: var(--site-font-feature); line-height: var(--site-leading-copy); }
.ui-inline-copy { display: grid; gap: var(--site-space-5); }
.ui-inline-copy p { max-width: 56ch; margin: 0; font-size: var(--site-font-body-lg); line-height: var(--site-leading-body); }
.ui-inline-actions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--site-space-4); }
@media (max-width: 650px) { .ui-grid { grid-template-columns: 1fr; } .ui-card--wide { grid-column: auto; } .ui-card-copy { align-items: start; flex-direction: column; } }
@media (max-width: 700px) {
  .ui-page__lede { margin: var(--site-space-5) 0 var(--site-space-8); font-size: var(--site-font-body-md); }
  .ui-card-copy h2 { font-size: var(--site-size-ui-card-mobile); }
  .ui-card-copy > p { font-size: var(--site-font-body); }
}
</style>
