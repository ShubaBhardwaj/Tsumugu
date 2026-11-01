import type { ComponentType } from 'react';
import * as Demos from './gallery-demos';

export const galleryCategories = ['All', 'Navigation', 'Actions', 'Inputs', 'Content', 'Overlays', 'Feedback', 'AI', 'System', 'Optional'] as const;
export type GalleryCategory = typeof galleryCategories[number];
export type GalleryEntry = {
  id: string; title: string; category: Exclude<GalleryCategory, 'All'>;
  description: string; source: 'Paper' | 'Custom' | 'System' | 'Companion';
  file: string; component: ComponentType;
};

export const materialCatalog: GalleryEntry[] = [
  { id: 'appbar', title: 'Top app bar', category: 'Navigation', source: 'Paper', file: 'navigation.tsx', component: Demos.AppBarDemo, description: 'Collection title, back navigation, and overflow actions.' },
  { id: 'navigation', title: 'Bottom navigation', category: 'Navigation', source: 'Paper', file: 'navigation.tsx', component: Demos.NavigationDemo, description: 'Four main destinations with a Material active indicator.' },
  { id: 'selectionbar', title: 'Contextual selection bar', category: 'Navigation', source: 'Custom', file: 'navigation.tsx', component: Demos.SelectionBarDemo, description: 'Bulk actions replace the usual header while files are selected.' },
  { id: 'breadcrumbs', title: 'Folder breadcrumbs', category: 'Navigation', source: 'Custom', file: 'collections.tsx', component: Demos.BreadcrumbsDemo, description: 'A clear way back from a folder to its collection root.' },
  { id: 'buttons', title: 'Button variants', category: 'Actions', source: 'Paper', file: 'actions.tsx', component: Demos.ButtonsDemo, description: 'Filled, tonal, outlined, text, disabled, and loading states.' },
  { id: 'icons', title: 'Icon buttons, ripple & tooltips', category: 'Actions', source: 'Paper', file: 'actions.tsx · feedback.tsx', component: Demos.IconsRippleDemo, description: 'Try press feedback, toggle pin, or long-press Share.' },
  { id: 'fab', title: 'Floating action buttons', category: 'Actions', source: 'Paper', file: 'actions.tsx', component: Demos.FABDemo, description: 'Small, standard, and extended Add document actions.' },
  { id: 'search', title: 'Search bar', category: 'Inputs', source: 'Paper', file: 'inputs.tsx', component: Demos.SearchDemo, description: 'A simple rounded search bar with live sample filtering.' },
  { id: 'textfields', title: 'Text fields & helper text', category: 'Inputs', source: 'Paper', file: 'inputs.tsx', component: Demos.TextFieldsDemo, description: 'Collection names, multiline questions, and validation feedback.' },
  { id: 'chips', title: 'Filter, assist & input chips', category: 'Inputs', source: 'Paper', file: 'inputs.tsx', component: Demos.ChipsDemo, description: 'Filter file types, trigger study actions, and remove a selected file.' },
  { id: 'segments', title: 'Segmented buttons', category: 'Inputs', source: 'Paper', file: 'inputs.tsx', component: Demos.SegmentedDemo, description: 'Choose between list and grid views.' },
  { id: 'selection', title: 'Checkboxes, radios & switches', category: 'Inputs', source: 'Paper', file: 'inputs.tsx', component: Demos.SelectionControlsDemo, description: 'Multi-selection, sort choices, and settings toggles.' },
  { id: 'form', title: 'Collection & folder form', category: 'Inputs', source: 'Custom', file: 'gallery-demos.tsx · inputs.tsx', component: Demos.CollectionFormDemo, description: 'Name validation and a collection-color selector. Local preview only.' },
  { id: 'collectionpicker', title: 'Collection picker', category: 'Inputs', source: 'Custom', file: 'gallery-demos.tsx · inputs.tsx', component: Demos.CollectionPickerDemo, description: 'Choose the collection for incoming documents or AI context.' },
  { id: 'typography', title: 'Material typography', category: 'Content', source: 'Paper', file: 'content.tsx', component: Demos.TypographyDemo, description: 'Headline, title, body, and label styles for a consistent hierarchy.' },
  { id: 'surfaces', title: 'Surfaces, elevation & dividers', category: 'Content', source: 'Paper', file: 'content.tsx', component: Demos.SurfaceDemo, description: 'Inspect background levels and the separation between items.' },
  { id: 'collections', title: 'Collection folder cards', category: 'Content', source: 'Custom', file: 'collections.tsx', component: Demos.CollectionsDemo, description: 'Your existing dimensional folder artwork, menus, and New tile.' },
  { id: 'pinned', title: 'Pinned collection chips', category: 'Content', source: 'Custom', file: 'collections.tsx', component: Demos.PinnedDemo, description: 'Compact shortcuts with collection names and file counts.' },
  { id: 'documents', title: 'Document rows & file icons', category: 'Content', source: 'Custom', file: 'collections.tsx', component: Demos.ListsDemo, description: 'PDFs, images, and links with a selectable document-row appearance.' },
  { id: 'cards', title: 'Cards', category: 'Content', source: 'Paper', file: 'content.tsx', component: Demos.CardsDemo, description: 'Outlined and filled information cards with actions.' },
  { id: 'activity', title: 'Activity & inbox items', category: 'Content', source: 'Custom', file: 'gallery-demos.tsx', component: Demos.ActivityInboxDemo, description: 'File additions, collection-specific chats, and incoming material.' },
  { id: 'profile', title: 'Profile, settings & storage', category: 'Content', source: 'Custom', file: 'gallery-demos.tsx', component: Demos.ProfileSettingsDemo, description: 'Guest status, settings rows, and honest storage information.' },
  { id: 'menu', title: 'Sort & overflow menus', category: 'Overlays', source: 'Paper', file: 'overlays.tsx', component: Demos.MenuDemo, description: 'Anchored choices for sorting and collection actions.' },
  { id: 'sheet', title: 'Modal bottom sheet', category: 'Overlays', source: 'Companion', file: 'overlays.tsx', component: Demos.BottomSheetDemo, description: 'Open a draggable sheet for Create folder and Add document.' },
  { id: 'dialog', title: 'Confirmation dialog', category: 'Overlays', source: 'Paper', file: 'overlays.tsx', component: Demos.DialogDemo, description: 'Confirm removing a collection link while preserving the source file.' },
  { id: 'feedback', title: 'Snackbar, banner & badge', category: 'Feedback', source: 'Paper', file: 'feedback.tsx', component: Demos.FeedbackDemo, description: 'Transient updates with Undo, persistent notices, and inbox counts.' },
  { id: 'progress', title: 'Progress indicators', category: 'Feedback', source: 'Paper', file: 'feedback.tsx', component: Demos.ProgressDemo, description: 'Circular loading and measurable linear progress.' },
  { id: 'empty', title: 'Empty state', category: 'Feedback', source: 'Custom', file: 'collections.tsx', component: Demos.EmptyDemo, description: 'Make an empty collection feel intentional and easy to get started.' },
  { id: 'ai-entry', title: 'Guest gate & AI entry card', category: 'AI', source: 'Custom', file: 'ai.tsx', component: Demos.AIEntryDemo, description: 'Compare guest sign-in and signed-in AI entry appearances.' },
  { id: 'chat', title: 'Chat, composer & citations', category: 'AI', source: 'Custom', file: 'ai.tsx', component: Demos.ChatDemo, description: 'Collection-scoped chat layout, source chips, and study shortcuts.' },
  { id: 'analysis', title: 'Analysis status', category: 'AI', source: 'Custom', file: 'ai.tsx', component: Demos.AnalysisDemo, description: 'Not analyzed, analyzing, ready, and update-needed appearances.' },
  { id: 'flashcard', title: 'Flashcards', category: 'AI', source: 'Custom', file: 'ai.tsx', component: Demos.FlashcardDemo, description: 'Reveal the answer, then return to the question.' },
  { id: 'quiz', title: 'Quiz choices & results', category: 'AI', source: 'Custom', file: 'gallery-demos.tsx', component: Demos.QuizDemo, description: 'Choose an answer and inspect correct or incorrect feedback.' },
  { id: 'study', title: 'Key points & PYQ answers', category: 'AI', source: 'Custom', file: 'gallery-demos.tsx', component: Demos.StudyNotesDemo, description: 'Sample study results with their document reference.' },
  { id: 'native-document', title: 'System document picker', category: 'System', source: 'System', file: 'native-actions.tsx', component: Demos.NativeDocumentDemo, description: 'Open the real picker. Selection is temporary; nothing is imported.' },
  { id: 'native-photo', title: 'System photo picker', category: 'System', source: 'System', file: 'native-actions.tsx', component: Demos.NativePhotoDemo, description: 'Select study images using the platform picker.' },
  { id: 'native-share', title: 'System share sheet', category: 'System', source: 'System', file: 'native-actions.tsx', component: Demos.NativeShareDemo, description: 'Share an app-generated sample text document on Android.' },
  { id: 'native-permission', title: 'Permission status', category: 'System', source: 'System', file: 'native-actions.tsx', component: Demos.NativePermissionDemo, description: 'Inspect current photo access without requesting unnecessary permissions.' },
  { id: 'tabs', title: 'Secondary tabs', category: 'Optional', source: 'Custom', file: 'navigation.tsx', component: Demos.TabsDemo, description: 'Switch peer views within a screen.' },
  { id: 'adaptive-navigation', title: 'Navigation rail & drawer', category: 'Optional', source: 'Custom', file: 'navigation.tsx', component: Demos.AdaptiveNavigationDemo, description: 'Explore larger-screen navigation alternatives.' },
  { id: 'slider', title: 'Slider', category: 'Optional', source: 'Companion', file: 'optional.tsx', component: Demos.SliderDemo, description: 'A numeric setting such as quiz length.' },
  { id: 'date', title: 'Date picker', category: 'Optional', source: 'System', file: 'date-time-picker.tsx', component: Demos.DateDemo, description: 'Native date selection on Android; a labelled input preview on web.' },
  { id: 'time', title: 'Time picker', category: 'Optional', source: 'System', file: 'date-time-picker.tsx', component: Demos.TimeDemo, description: 'Native reminder-time selection on Android.' },
  { id: 'carousel', title: 'Collection carousel', category: 'Optional', source: 'Custom', file: 'optional.tsx', component: Demos.CarouselDemo, description: 'A horizontal collection list using your folder-card artwork.' },
];
