import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button, Card, Checkbox, Chip, Divider, HelperText, Icon, IconButton,
  List, Menu, Portal, RadioButton, Snackbar, Switch, Text,
  Tooltip, useTheme,
} from 'react-native-paper';

import {
  MaterialActionSheet, MaterialActivityIndicator, MaterialAIEntryCard,
  MaterialAIQuickActions, MaterialAnalysisStatus, MaterialAppBar, MaterialBadge,
  MaterialBanner, MaterialBreadcrumbs, MaterialButton, MaterialCard,
  MaterialCarousel, MaterialChatComposer, MaterialChatMessage, MaterialCollectionCard,
  MaterialConfirmDialog, MaterialDateTimePicker, MaterialDocumentRow,
  MaterialEmptyState, MaterialFAB, MaterialFlashcard, MaterialIconButton,
  MaterialNativeAction, MaterialNavigationBar, MaterialNavigationDrawer,
  MaterialNavigationRail, MaterialNewCollectionTile, MaterialPinnedCollection,
  MaterialProgressBar, MaterialRipple, MaterialSearchbar, MaterialSegmentedButtons,
  MaterialSelectionBar, MaterialSlider, MaterialSourceCitation, MaterialSurface,
  MaterialTabs, MaterialText, MaterialTextField, folderColors, materialDestinations,
  type PreviewCollection,
} from './index';

const collections: PreviewCollection[] = [
  { id: 'dbms', name: 'DBMS', fileCount: 9, color: folderColors.mint },
  { id: 'networks', name: 'Networks', fileCount: 8, color: folderColors.blue },
  { id: 'os', name: 'Operating Systems', fileCount: 11, color: folderColors.lavender },
];

export function TypographyDemo() {
  return <View style={styles.stack}>
    <MaterialText variant="headlineSmall">Your next study session.</MaterialText>
    <MaterialText variant="titleMedium">DBMS collection</MaterialText>
    <MaterialText variant="bodyMedium">Notes, questions, and the answers you need. Together.</MaterialText>
    <MaterialText variant="labelSmall">9 FILES · UPDATED TODAY</MaterialText>
  </View>;
}

export function SurfaceDemo() {
  const { colors } = useTheme();
  return <View style={styles.row}>
    {([0, 1, 2, 3] as const).map(level => <MaterialSurface key={level} elevation={level}
      style={{ padding: 18, borderRadius: 16, minWidth: 100 }}>
      <Text variant="labelMedium">Level {level}</Text>
    </MaterialSurface>)}
    <View style={{ width: '100%', gap: 12 }}><Divider /><Text style={{ color: colors.onSurfaceVariant }}>Quiet surfaces and subtle dividers.</Text></View>
  </View>;
}

export function AppBarDemo() {
  const [message, setMessage] = useState('Tap the back or menu action.');
  return <View style={styles.stack}>
    <MaterialAppBar title="DBMS" subtitle="12 documents · 1 folder" onBack={() => setMessage('Back to Collections.')} onAction={() => setMessage('Rename · Pin · Remove collection')} />
    <Text variant="bodySmall">{message}</Text>
  </View>;
}

export function NavigationDemo() {
  const [index, setIndex] = useState(0);
  return <View style={styles.stack}>
    <Text variant="bodyMedium">Selected: {materialDestinations[index].title}</Text>
    <View style={styles.clip}><MaterialNavigationBar index={index} onIndexChange={setIndex} /></View>
    <Text variant="bodySmall">Preview navigation only; these tabs do not leave the gallery.</Text>
  </View>;
}

export function SelectionBarDemo() {
  const [selected, setSelected] = useState(true);
  const [action, setAction] = useState('');
  return <View style={styles.stack}>
    {selected ? <MaterialSelectionBar count={2} onClose={() => setSelected(false)} onMove={() => setAction('Move 2 links to a folder')}
      onShare={() => setAction('Share 2 selected documents')} onRemove={() => { setAction('2 links removed in this preview'); setSelected(false); }} />
      : <Button mode="outlined" onPress={() => { setSelected(true); setAction(''); }}>Select two documents</Button>}
    {Boolean(action) && <Text accessibilityLiveRegion="polite">{action}</Text>}
  </View>;
}

export function TabsDemo() {
  const [tab, setTab] = useState('Notes');
  return <View style={styles.stack}><MaterialTabs items={['Notes', 'Quiz', 'Flashcards']} value={tab} onChange={setTab} /><Text>{tab} content preview</Text></View>;
}

export function AdaptiveNavigationDemo() {
  const [index, setIndex] = useState(0);
  return <View style={styles.stack}>
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <MaterialNavigationRail index={index} onIndexChange={setIndex} />
      <View style={{ flex: 1 }}><MaterialNavigationDrawer index={index} onIndexChange={setIndex} /></View>
    </View>
    <Text variant="bodySmall">Tablet alternatives. Phone navigation uses the four-item bottom bar.</Text>
  </View>;
}

export function SearchDemo() {
  const [query, setQuery] = useState('');
  const documents = ['Unit_2_Notes.pdf', 'SQL_Practice.pdf', 'ER_Diagram.png'];
  const matches = documents.filter(name => name.toLowerCase().includes(query.toLowerCase()));
  return <View style={styles.stack}>
    <MaterialSearchbar value={query} onChangeText={setQuery} placeholder="Search your documents…" />
    <Text variant="bodySmall">{matches.length ? matches.join(' · ') : 'No matching documents'}</Text>
  </View>;
}

export function ButtonsDemo() {
  const [action, setAction] = useState('Try a button variant.');
  return <View style={styles.stack}>
    <View style={styles.row}>
      <MaterialButton icon="plus" onPress={() => setAction('Filled: create collection')}>Create collection</MaterialButton>
      <MaterialButton mode="contained-tonal" icon="creation" onPress={() => setAction('Tonal: analyze collection')}>Analyze</MaterialButton>
      <MaterialButton mode="outlined" onPress={() => setAction('Outlined: sign in')}>Sign in</MaterialButton>
      <MaterialButton mode="text" onPress={() => setAction('Text: manage pinned collections')}>Manage</MaterialButton>
      <MaterialButton disabled>Disabled</MaterialButton>
      <MaterialButton loading onPress={() => setAction('Loading state preview')}>Saving</MaterialButton>
    </View>
    <Text variant="bodySmall" accessibilityLiveRegion="polite">{action}</Text>
  </View>;
}

export function IconsRippleDemo() {
  const { colors } = useTheme();
  const [pinned, setPinned] = useState(false);
  const [taps, setTaps] = useState(0);
  return <View style={styles.stack}>
    <View style={styles.row}>
      <MaterialIconButton icon="arrow-left" accessibilityLabel="Preview back button" onPress={() => setTaps(value => value + 1)} />
      <MaterialIconButton icon={pinned ? 'pin' : 'pin-outline'} selected={pinned} mode="contained-tonal" accessibilityLabel="Toggle pin" onPress={() => setPinned(value => !value)} />
      <Tooltip title="Share collection"><IconButton icon="share-variant-outline" accessibilityLabel="Share collection" onPress={() => setTaps(value => value + 1)} /></Tooltip>
    </View>
    <MaterialRipple onPress={() => setTaps(value => value + 1)} style={{ borderRadius: 16, backgroundColor: colors.primaryContainer }}>
      <View style={{ padding: 20 }}><Text>Tap to see ripple feedback · {taps}</Text></View>
    </MaterialRipple>
    <Text variant="bodySmall">Long-press the share icon to see its tooltip.</Text>
  </View>;
}

export function FABDemo() {
  const [count, setCount] = useState(0);
  return <View style={styles.stack}>
    <View style={styles.row}>
      <MaterialFAB icon="plus" size="small" accessibilityLabel="Add document, small" onPress={() => setCount(value => value + 1)} />
      <MaterialFAB icon="plus" accessibilityLabel="Add document" onPress={() => setCount(value => value + 1)} />
      <MaterialFAB icon="plus" label="Add document" onPress={() => setCount(value => value + 1)} />
    </View><Text variant="bodySmall">{count ? `${count} add actions previewed` : 'Standard, small, and extended variants.'}</Text>
  </View>;
}

export function TextFieldsDemo() {
  const [name, setName] = useState('DBMS');
  const [message, setMessage] = useState('Explain normalization with an example.');
  const invalid = !name.trim();
  return <View style={styles.stack}>
    <View><MaterialTextField label="Collection name" value={name} onChangeText={setName} error={invalid} />
      <HelperText type={invalid ? 'error' : 'info'}>{invalid ? 'Collection name is required.' : 'Try clearing the name to see validation.'}</HelperText></View>
    <MaterialTextField label="Study question" value={message} onChangeText={setMessage} multiline numberOfLines={3} />
  </View>;
}

export function ChipsDemo() {
  const [type, setType] = useState('All');
  const [inputVisible, setInputVisible] = useState(true);
  const [action, setAction] = useState('');
  return <View style={styles.stack}>
    <View style={styles.row}>{['All', 'PDF', 'Images', 'Links'].map(label => <Chip key={label} selected={type === label} showSelectedCheck onPress={() => setType(label)}>{label}</Chip>)}</View>
    <View style={styles.row}>
      <Chip icon="creation" onPress={() => setAction('Quiz action selected')}>Generate quiz</Chip>
      {inputVisible ? <Chip icon="file-pdf-box" onClose={() => setInputVisible(false)} closeIconAccessibilityLabel="Remove selected document">Unit_2_Notes.pdf</Chip>
        : <Button onPress={() => setInputVisible(true)}>Restore input chip</Button>}
    </View><Text variant="bodySmall">Filter: {type}{action ? ` · ${action}` : ''}</Text>
  </View>;
}

export function SegmentedDemo() {
  const [value, setValue] = useState('list');
  return <View style={styles.stack}><MaterialSegmentedButtons value={value} onValueChange={setValue}
    buttons={[{ value: 'list', label: 'List', icon: 'view-list-outline' }, { value: 'grid', label: 'Grid', icon: 'view-grid-outline' }]} />
    <Text variant="bodySmall">Selected view: {value}</Text></View>;
}

export function SelectionControlsDemo() {
  const [checked, setChecked] = useState(true);
  const [sort, setSort] = useState('recent');
  const [notifications, setNotifications] = useState(false);
  return <View style={styles.stack}>
    <Checkbox.Item label="Unit_2_Notes.pdf" status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(value => !value)} />
    <RadioButton.Group value={sort} onValueChange={setSort}>
      <RadioButton.Item label="Recently added" value="recent" /><RadioButton.Item label="Alphabetical" value="name" />
    </RadioButton.Group>
    <View style={styles.between}><Text>Study reminders</Text><Switch accessibilityLabel="Study reminders" value={notifications} onValueChange={setNotifications} /></View>
  </View>;
}

export function CollectionsDemo() {
  const [message, setMessage] = useState('Tap a folder or its menu.');
  return <View style={styles.stack}>
    <View style={styles.row}>{collections.slice(0, 2).map(collection => <MaterialCollectionCard key={collection.id} collection={collection} width={138}
      onPress={() => setMessage(`Open ${collection.name}`)} onMenu={() => setMessage(`Manage ${collection.name}`)} />)}</View>
    <MaterialNewCollectionTile onPress={() => setMessage('Create a new collection')} />
    <Text variant="bodySmall" accessibilityLiveRegion="polite">{message}</Text>
  </View>;
}

export function PinnedDemo() {
  const [message, setMessage] = useState('');
  return <View style={styles.stack}><View style={styles.row}>
    {collections.map(item => <MaterialPinnedCollection key={item.id} name={item.name} count={item.fileCount} color={item.color} onPress={() => setMessage(`Open ${item.name}`)} />)}
  </View>{Boolean(message) && <Text>{message}</Text>}</View>;
}

export function ListsDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const rows = [
    { name: 'Unit_2_Notes.pdf', description: 'PDF · 2.4 MB', type: 'pdf' as const },
    { name: 'ER_Diagram.png', description: 'Image · 1.2 MB', type: 'image' as const },
    { name: 'Normalization lecture', description: 'Video link · DBMS', type: 'link' as const },
  ];
  function toggle(name: string) { setSelected(items => items.includes(name) ? items.filter(item => item !== name) : [...items, name]); }
  return <View style={styles.stack}>{rows.map(row => <MaterialDocumentRow key={row.name} {...row} selected={selected.includes(row.name)} onPress={() => toggle(row.name)} onLongPress={() => toggle(row.name)} />)}
    <Text variant="bodySmall">Tap or long-press to select · {selected.length} selected</Text></View>;
}

export function CardsDemo() {
  const [expanded, setExpanded] = useState(false);
  return <View style={styles.stack}>
    <MaterialCard mode="outlined"><Card.Title title="On-device collections" subtitle="Your study material stays organized" left={props => <Icon {...props} source="folder-outline" size={28} />} />
      <Card.Content><Text variant="bodyMedium">9 documents linked to DBMS.</Text>{expanded && <Text style={{ marginTop: 8 }}>Linked document sizes and app-owned storage are tracked separately.</Text>}</Card.Content>
      <Card.Actions><Button onPress={() => setExpanded(value => !value)}>{expanded ? 'Less' : 'Details'}</Button></Card.Actions>
    </MaterialCard>
    <MaterialCard mode="contained"><Card.Content><Text variant="titleSmall">Storage overview</Text><Text>App cache · 12 MB</Text></Card.Content></MaterialCard>
  </View>;
}

export function MenuDemo() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('Recently added');
  return <View style={styles.stack}>
    <Menu visible={visible} onDismiss={() => setVisible(false)} anchor={<Button mode="outlined" icon="sort" onPress={() => setVisible(true)}>{value}</Button>}>
      {['Recently added', 'Alphabetical', 'File size'].map(label => <Menu.Item key={label} title={label} leadingIcon={value === label ? 'check' : undefined} onPress={() => { setValue(label); setVisible(false); }} />)}
      <Divider /><Menu.Item title="Rename collection" leadingIcon="pencil-outline" onPress={() => { setValue('Rename selected'); setVisible(false); }} />
    </Menu><Text variant="bodySmall">Tap the control to open an anchored Material menu.</Text>
  </View>;
}

export function BottomSheetDemo() {
  const [message, setMessage] = useState('');
  return <View style={styles.stack}><MaterialActionSheet title="Add to DBMS" triggerLabel="Add to collection"
    actions={[{ label: 'Create folder', icon: 'folder-plus-outline', onPress: () => setMessage('Create folder selected') },
      { label: 'Add document', icon: 'file-plus-outline', onPress: () => setMessage('Add document selected') }]} />
    {Boolean(message) && <Text accessibilityLiveRegion="polite">{message}</Text>}</View>;
}

export function DialogDemo() {
  const [visible, setVisible] = useState(false);
  const [removed, setRemoved] = useState(false);
  return <View style={styles.stack}><Button mode="outlined" icon="link-off" onPress={() => setVisible(true)}>Preview remove confirmation</Button>
    {removed && <Text>Demo link removed. The original file is unchanged.</Text>}
    <MaterialConfirmDialog visible={visible} title="Remove from DBMS?" onDismiss={() => setVisible(false)} onConfirm={() => { setRemoved(true); setVisible(false); }}>
      This removes the collection link. The original document stays on your device. This is a preview only.
    </MaterialConfirmDialog></View>;
}

export function FeedbackDemo() {
  const [snackbar, setSnackbar] = useState(false);
  const [banner, setBanner] = useState(true);
  const [message, setMessage] = useState('');
  return <View style={styles.stack}>
    <MaterialBanner visible={banner} icon="lock-outline" actions={[{ label: 'Sign in', onPress: () => setMessage('Sign-in flow preview') }, { label: 'Later', onPress: () => setBanner(false) }]}>
      Sign in to study with AI. Your collections are available without an account.
    </MaterialBanner>
    <View style={styles.row}><Button mode="outlined" onPress={() => setSnackbar(true)}>Show snackbar</Button>{!banner && <Button onPress={() => setBanner(true)}>Restore banner</Button>}</View>
    <View style={styles.row}><Icon source="inbox-outline" size={28} /><MaterialBadge>3</MaterialBadge><Text>Documents waiting in Inbox</Text></View>
    {Boolean(message) && <Text>{message}</Text>}
    <Portal><Snackbar visible={snackbar} duration={4000} onDismiss={() => setSnackbar(false)} action={{ label: 'Undo', onPress: () => { setMessage('Demo removal undone'); setSnackbar(false); } }}>Link removed from DBMS</Snackbar></Portal>
  </View>;
}

export function ProgressDemo() {
  const [progress, setProgress] = useState(0.45);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setProgress(value => Math.min(1, value + 0.1)), 500);
    return () => clearInterval(timer);
  }, [running]);
  useEffect(() => { if (progress >= 1) setRunning(false); }, [progress]);
  return <View style={styles.stack}><View style={styles.row}><MaterialActivityIndicator animating /><Text>Loading document</Text></View>
    <MaterialProgressBar progress={progress} style={{ height: 6, borderRadius: 8 }} />
    <Text>Analysis preview · {Math.round(progress * 100)}%</Text>
    <Button mode="outlined" onPress={() => { setProgress(0); setRunning(true); }}>Run progress demo</Button></View>;
}

export function SliderDemo() {
  const [count, setCount] = useState(10);
  return <View style={styles.stack}><Text variant="titleMedium">{count} quiz questions</Text>
    <MaterialSlider accessibilityLabel="Number of quiz questions" minimumValue={5} maximumValue={30} step={5} value={10} onValueChange={setCount} />
    <Text variant="bodySmall">Optional numeric preference. Preview only.</Text></View>;
}

export function CarouselDemo() {
  const [selected, setSelected] = useState('');
  return <View style={styles.stack}><MaterialCarousel>{collections.map(collection => <MaterialCollectionCard key={collection.id} collection={collection} width={150} onPress={() => setSelected(collection.name)} />)}</MaterialCarousel>
    <Text variant="bodySmall">{selected ? `${selected} selected` : 'Swipe horizontally to browse.'}</Text></View>;
}

export function BreadcrumbsDemo() {
  const [folder, setFolder] = useState(true);
  return <View style={styles.stack}><MaterialBreadcrumbs items={[{ label: 'DBMS', onPress: () => setFolder(false) }, ...(folder ? [{ label: 'Unit 1' }] : [])]} />
    <List.Item title={folder ? 'Introduction.pdf' : 'Unit 1 — Foundations'} description={folder ? 'PDF · 640 KB' : '8 documents'}
      left={props => <List.Icon {...props} icon={folder ? 'file-pdf-box' : 'folder-outline'} />} onPress={() => setFolder(true)} />
    <Text variant="bodySmall">Tap DBMS to return to the root. One folder level.</Text></View>;
}

export function EmptyDemo() {
  const [added, setAdded] = useState(false);
  return added ? <View style={styles.stack}><MaterialDocumentRow name="Sample_Notes.pdf" description="Preview document · DBMS" /><Button onPress={() => setAdded(false)}>Reset empty state</Button></View>
    : <MaterialEmptyState onAdd={() => setAdded(true)} />;
}

export function CollectionFormDemo() {
  const [name, setName] = useState('');
  const [color, setColor] = useState(folderColors.mint);
  const [created, setCreated] = useState('');
  return <View style={styles.stack}>
    <MaterialTextField label="Collection or folder name" value={name} onChangeText={setName} maxLength={60} />
    <Text variant="labelMedium">Collection color</Text>
    <View style={styles.row}>{Object.entries(folderColors).map(([label, value]) => <IconButton key={label} icon={color === value ? 'check-circle' : 'circle'} iconColor={value} selected={color === value}
      accessibilityLabel={`Choose ${label}`} accessibilityState={{ selected: color === value }} onPress={() => setColor(value)} />)}</View>
    <Button mode="contained" disabled={!name.trim()} onPress={() => { setCreated(name.trim()); setName(''); }}>Create collection</Button>
    <HelperText type="info">{created ? `“${created}” created in this preview only.` : 'This form is a preview; nothing is written to your database.'}</HelperText>
  </View>;
}

export function CollectionPickerDemo() {
  const [selected, setSelected] = useState('dbms');
  return <View style={styles.stack}>
    <RadioButton.Group value={selected} onValueChange={setSelected}>{collections.map(item => <RadioButton.Item key={item.id} label={`${item.name} · ${item.fileCount} files`} value={item.id} />)}</RadioButton.Group>
    <Button mode="contained-tonal" onPress={() => setSelected(collections[(collections.findIndex(item => item.id === selected) + 1) % collections.length].id)}>Change collection</Button>
    <Text variant="bodySmall">Context preview: {collections.find(item => item.id === selected)?.name}</Text>
  </View>;
}

export function ActivityInboxDemo() {
  const [assigned, setAssigned] = useState(false);
  return <View style={styles.stack}>
    <List.Item title="Unit_3_Notes.pdf" description="Added to DBMS · 2h ago" left={props => <List.Icon {...props} icon="file-pdf-box" />} />
    <List.Item title="Explain normalization" description="Asked in DBMS · 1h ago" left={props => <List.Icon {...props} icon="creation" />} />
    <Divider />
    <List.Item title="Friend_Notes.pdf" description={assigned ? 'Assigned to DBMS · preview only' : 'Shared to Tsumugu · waiting for a collection'}
      left={props => <List.Icon {...props} icon="inbox-arrow-down-outline" />} />
    <Button mode="outlined" onPress={() => setAssigned(value => !value)}>{assigned ? 'Reset inbox item' : 'Assign to DBMS'}</Button>
    <Text variant="bodySmall">Sample inbox item. Registering the app as a share target is a separate feature.</Text>
  </View>;
}

export function AIEntryDemo() {
  const [signedIn, setSignedIn] = useState(false);
  const [message, setMessage] = useState('');
  return <View style={styles.stack}>
    <View style={styles.between}><Text>Signed-in preview</Text><Switch accessibilityLabel="Preview signed-in state" value={signedIn} onValueChange={setSignedIn} /></View>
    <MaterialAIEntryCard signedIn={signedIn} onPress={() => setMessage(signedIn ? 'Open collection-specific chat' : 'Open sign-in screen')} />
    {Boolean(message) && <Text>{message}</Text>}
    <Text variant="bodySmall">Appearance preview only. This switch does not authenticate a user or enable real AI requests.</Text>
  </View>;
}

export function ChatDemo() {
  const [draft, setDraft] = useState('');
  const [question, setQuestion] = useState('What is normalization?');
  const [message, setMessage] = useState('');
  return <View style={styles.stack}>
    <View style={styles.between}><Text variant="titleMedium">DBMS · AI assistant</Text><Chip icon="check-circle-outline">Analyzed</Chip></View>
    <MaterialChatMessage role="user">{question}</MaterialChatMessage>
    <MaterialChatMessage role="assistant">Normalization organizes tables to reduce redundant data and improve data integrity.</MaterialChatMessage>
    <View style={styles.row}><MaterialSourceCitation file="Unit_3_Notes.pdf" onPress={() => setMessage('Source document preview selected')} /></View>
    <MaterialChatComposer value={draft} onChangeText={setDraft} onSend={() => { setQuestion(draft.trim()); setDraft(''); setMessage('Demo message sent. The answer above is sample text, not an AI response.'); }} />
    <MaterialAIQuickActions onSelect={action => setMessage(`${action} preview selected`)} />
    <Text variant="bodySmall" accessibilityLiveRegion="polite">{message || 'Sample chat layout. No AI API calls are made.'}</Text>
  </View>;
}

export function AnalysisDemo() {
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'ready' | 'outdated'>('idle');
  return <View style={styles.stack}><MaterialAnalysisStatus status={status} progress={0.6} />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
      {(['idle', 'analyzing', 'ready', 'outdated'] as const).map(item => <Chip key={item} selected={status === item} onPress={() => setStatus(item)}>{item}</Chip>)}
    </ScrollView><Text variant="bodySmall">Select a state to inspect how analysis status is presented.</Text></View>;
}

export function FlashcardDemo() {
  return <MaterialFlashcard front="What does a primary key do?" back="It uniquely identifies each record in a table." />;
}

export function QuizDemo() {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return <View style={styles.stack}>
    <Text variant="titleMedium">Which normal form requires atomic values?</Text>
    <RadioButton.Group value={answer} onValueChange={value => { setAnswer(value); setSubmitted(false); }}>
      {['1NF', '2NF', '3NF'].map(value => <RadioButton.Item key={value} label={value} value={value} />)}
    </RadioButton.Group><Button mode="contained" disabled={!answer} onPress={() => setSubmitted(true)}>Check answer</Button>
    {submitted && <HelperText type={answer === '1NF' ? 'info' : 'error'}>{answer === '1NF' ? 'Correct. Each attribute contains a single atomic value.' : 'Try again. The answer is 1NF.'}</HelperText>}
  </View>;
}

export function StudyNotesDemo() {
  const [tab, setTab] = useState('Key points');
  return <View style={styles.stack}><MaterialTabs items={['Key points', 'PYQ answers']} value={tab} onChange={setTab} />
    <Text variant="titleMedium">{tab === 'Key points' ? 'Normalization essentials' : 'Explain 1NF with an example'}</Text>
    <Text variant="bodyMedium">{tab === 'Key points' ? '• 1NF uses atomic values.\n• 2NF removes partial dependencies.\n• 3NF removes transitive dependencies.' : 'Split repeating course lists into separate rows so that each course value is atomic.'}</Text>
    <MaterialSourceCitation file="Unit_3_Notes.pdf" onPress={() => setTab('PYQ answers')} />
    <Text variant="bodySmall">Static sample study content for reviewing the layout.</Text></View>;
}

export function ProfileSettingsDemo() {
  const [reminders, setReminders] = useState(false);
  return <View style={styles.stack}>
    <List.Item title="Using Tsumugu as a guest" description="Your collections work without an account" left={props => <List.Icon {...props} icon="account-circle-outline" />} />
    <Divider /><List.Item title="Study reminders" description="Notify me about upcoming sessions" right={() => <Switch accessibilityLabel="Study reminders preview" value={reminders} onValueChange={setReminders} />} />
    <MaterialCard><Card.Content><Text variant="titleMedium">Storage</Text><Text>App-owned cache · 12 MB</Text><Text>Linked documents · 84 MB</Text><HelperText type="info">Removing links does not free the source files’ storage.</HelperText></Card.Content></MaterialCard>
  </View>;
}

export function NativeDocumentDemo() { return <MaterialNativeAction action="document" />; }
export function NativePhotoDemo() { return <MaterialNativeAction action="photo" />; }
export function NativeShareDemo() { return <MaterialNativeAction action="share" />; }
export function NativePermissionDemo() { return <MaterialNativeAction action="permission" />; }
export function DateDemo() { return <MaterialDateTimePicker mode="date" />; }
export function TimeDemo() { return <MaterialDateTimePicker mode="time" />; }

const styles = StyleSheet.create({
  stack: { gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  clip: { overflow: 'hidden', borderRadius: 20 },
});
