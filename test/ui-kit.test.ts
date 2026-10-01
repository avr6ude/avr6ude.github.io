import { describe, expect, it } from 'vitest'
import {
  NbBadge,
  NbButtonGroup,
  NbCard,
  NbKbd,
  NbLink,
  NbMarker,
  NbSeparator,
  NbToggle,
} from '@neobrut-vue/core'

describe('@neobrut-vue/core 0.4 exports', () => {
  it('exports the primitives used by the site', () => {
    expect(NbBadge).toBeDefined()
    expect(NbButtonGroup).toBeDefined()
    expect(NbCard).toBeDefined()
    expect(NbKbd).toBeDefined()
    expect(NbLink).toBeDefined()
    expect(NbMarker).toBeDefined()
    expect(NbSeparator).toBeDefined()
    expect(NbToggle).toBeDefined()
  })
})
