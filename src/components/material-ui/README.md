# Tsumugu Material UI

Open **Material UI component lab** from the index screen, or visit `/material-ui-demo`.
The gallery has searchable, categorized examples, a light/dark switch, and temporary
Keep/Refine review marks. Marks reset when the screen is closed. All examples use
sample data. They do not change collections, authenticate users, or contact AI services.

## Files

| File | Components |
| --- | --- |
| `theme.ts` | Light/dark MD3 tokens, violet brand palette, folder colors |
| `provider.tsx` | Paper theme, icons, gesture root, bottom-sheet provider |
| `actions.tsx` | Filled/tonal/outlined/text buttons, icon buttons, FABs, ripple |
| `navigation.tsx` | App bar, contextual selection bar, bottom navigation, tabs, rail, drawer |
| `inputs.tsx` | Search, text fields, helper text, chips, segmented buttons, checkbox, radio, switch |
| `content.tsx` | Cards, list items, typography, surfaces, dividers |
| `feedback.tsx` | Snackbar, banner, badge, linear/circular progress, tooltip |
| `overlays.tsx` | Draggable action sheet, confirmation dialog, menu, portal |
| `collections.tsx` | Folder cards, pinned shortcuts, New tile, breadcrumbs, document rows, empty state |
| `ai.tsx` | Guest entry card, chat/composer, citations, quick actions, analysis status, flashcard |
| `optional.tsx` | Slider, horizontal collection carousel, theme swatches |
| `date-time-picker.tsx` | Native date/time pickers; explicitly labelled web-input fallback |
| `native-actions.tsx` | Real document/photo pickers, sample sharing, permission-status inspection |
| `gallery-demos.tsx` | Interactive example compositions: collection/folder form, picker, quiz, PYQ/key points, inbox, settings |
| `catalog.ts` | Preview titles, categories, source type, edit locations |
| `gallery.tsx` | Searchable preview browser and session-only review marks |
| `index.ts` | Reusable component exports |

Import reusable elements from `@/components/material-ui`. The folder artwork reuses
`../folder-icon.tsx`; it is not duplicated. Controls share the provider's theme.
The navigation bar here is presentation only: real app routes remain owned by Expo Router.

## Native build and limitations

- New native dependencies were added using `bunx expo install --bun`. Existing development
  clients need an **EAS development rebuild** before testing those native modules.
- React Native Paper supplies MD3-styled React Native controls; these are not Jetpack Compose components.
- Bottom sheets use `@gorhom/bottom-sheet`; sliders and date/time pickers use their community modules.
- Android system dialogs cannot be recolored by wrapping them in a Paper theme.
- Document picker selections are temporary gallery results. Persistent original-file URI
  permissions and real collection linking still belong in the production file-access service.
- The Inbox example is a visual composition. Actual incoming share-intent registration
  and processing are not implemented by this gallery.
- Photo-permission preview reads the current status. It does not request broad library access.
- On Android, the share demo sends an app-generated sample `.txt` file, not a user's document.
- The web gallery is useful for appearance review. Native Android behavior must be verified
  on a device after rebuilding. No EAS build is submitted by opening this gallery.

## Commands

```sh
bunx expo start --dev-client
bunx expo start --web
bunx expo lint
bunx tsc --noEmit
```
