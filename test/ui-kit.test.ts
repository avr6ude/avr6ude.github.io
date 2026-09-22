import { describe, expect, it } from 'vitest'
import {
  NbButtonGroup,
  NbKbd,
  NbLink,
  NbMarker,
  NbToggle,
} from '@neobrut-vue/core'

describe('@neobrut-vue/core 0.2 inline primitives', () => {
  it('exports the inline primitives used by the UI lab', () => {
    expect(NbButtonGroup).toBeDefined()
    expect(NbKbd).toBeDefined()
    expect(NbLink).toBeDefined()
    expect(NbMarker).toBeDefined()
    expect(NbToggle).toBeDefined()
  })
})
