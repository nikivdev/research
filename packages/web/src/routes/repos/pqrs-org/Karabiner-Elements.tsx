import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/pqrs-org/Karabiner-Elements")({
  component: KarabinerElementsPage,
})

function KarabinerElementsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
              ⌨️
            </div>
            <div>
              <h1 className="text-xl font-bold">Karabiner-Elements</h1>
              <p className="text-sm text-slate-400">Deep Dive into macOS Keyboard Remapping</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4">What is Karabiner-Elements?</h2>
          <p className="text-slate-300 mb-6">
            Karabiner-Elements is a powerful keyboard customizer for macOS that intercepts keyboard events
            at the lowest possible level, transforms them according to user-defined rules, and injects
            the modified events back into the system via a virtual HID device. It enables complex
            remappings, application-specific shortcuts, and advanced keyboard workflows.
          </p>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-4">High-Level Architecture</h3>
            <div className="font-mono text-sm text-slate-300 bg-slate-950 rounded-lg p-4 overflow-x-auto">
              <pre>{`┌─────────────────────────────────────────────────────────────────┐
│                    User Applications                             │
│           (SettingsWindow, EventViewer, Menu, etc.)              │
└────────────────────────────┬────────────────────────────────────┘
                             │ LaunchAgents
┌────────────────────────────▼────────────────────────────────────┐
│        karabiner_console_user_server (user privilege)           │
│  • Monitors frontmost app, input source, system prefs           │
│  • Executes shell_command, software_function                    │
│  • Watches configuration files (~/.config/karabiner/)           │
└────────────────────────────┬────────────────────────────────────┘
                             │ Unix datagram socket
┌────────────────────────────▼────────────────────────────────────┐
│      Karabiner-Core-Service (root privilege / LaunchDaemon)     │
│  • Event grabbing (IOKit device seizure)                        │
│  • Event manipulation pipeline                                  │
│  • Virtual HID device injection                                 │
└────────────────┬───────────────────┬────────────────────────────┘
                 │                   │
    ┌────────────▼────┐    ┌─────────▼─────────┐
    │ Physical Devices │    │ Virtual HID Device │
    │  (IOKit seizure) │    │   (DriverKit)      │
    └─────────────────┘    └───────────────────┘`}</pre>
            </div>
          </div>
        </section>

        {/* Runtime Topology */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Runtime Topology</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ProcessCard
              name="Karabiner-Core-Service"
              privilege="root (LaunchDaemon)"
              color="red"
              description="The heart of Karabiner. Owns device access and event modification. Exposes Unix domain sockets and talks to the DriverKit virtual HID device."
              path="src/core/CoreService/src/main.cpp"
              features={[
                "IOKit device seizure (kIOHIDOptionsTypeSeizeDevice)",
                "Event manipulation pipeline",
                "Virtual HID report generation",
                "Socket-based IPC with user processes",
              ]}
            />
            <ProcessCard
              name="karabiner_session_monitor"
              privilege="setuid root"
              color="orange"
              description="Determines the current console user via CGSessionCopyCurrentDictionary and informs Core Service which UID should own its socket."
              path="src/core/session_monitor/src/main.cpp"
              features={[
                "Console user detection",
                "Socket ownership handoff",
                "Fast user switching support",
              ]}
            />
            <ProcessCard
              name="karabiner_console_user_server"
              privilege="user (LaunchAgent)"
              color="blue"
              description="Bridge to user context. Activates virtual HID driver, registers agents, watches configuration, and forwards environment changes to Core Service."
              path="src/core/console_user_server/src/main.cpp"
              features={[
                "Virtual HID driver activation",
                "Configuration file monitoring",
                "Frontmost app / input source tracking",
                "shell_command execution",
              ]}
            />
            <ProcessCard
              name="Virtual HID Device"
              privilege="System Extension"
              color="purple"
              description="DriverKit-based virtual keyboard/mouse that produces HID reports macOS treats as real hardware input."
              path="vendor/Karabiner-DriverKit-VirtualHIDDevice/"
              features={[
                "Virtual keyboard reports",
                "Virtual pointing device reports",
                "Transparent to macOS",
                "Special keys work correctly",
              ]}
            />
          </div>
        </section>

        {/* Event Capture */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Event Capture Mechanisms</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400">📡</span>
                </div>
                <h3 className="text-lg font-semibold">IOKit Device Seizure</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Primary capture path. Opens HID devices with <code className="text-green-400">kIOHIDOptionsTypeSeizeDevice</code> flag,
                giving Karabiner exclusive access to keyboard/mouse events.
              </p>
              <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 mb-4">
                <pre>{`// device_grabber.hpp
hid_manager_ = std::make_unique<
  pqrs::osx::iokit_hid_manager>(
    weak_dispatcher_,
    run_loop_thread,
    matching_dictionaries,
    std::chrono::milliseconds(1000)
);

// Each device opened with:
IOHIDDeviceOpen(device,
  kIOHIDOptionsTypeSeizeDevice);`}</pre>
              </div>
              <div className="text-sm text-slate-400">
                <strong>Grabbed devices:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Keyboards (generic_desktop::keyboard)</li>
                  <li>Mice and Pointers</li>
                  <li>Joysticks/Gamepads</li>
                  <li>Consumer devices (headsets, buttons)</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400">👆</span>
                </div>
                <h3 className="text-lg font-semibold">CGEventTap (Trackpad)</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Apple trackpad drivers bypass IOKit, requiring a separate <code className="text-blue-400">CGEventTap</code> in
                listen-only mode to capture trackpad events.
              </p>
              <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 mb-4">
                <pre>{`// event_tap_monitor.hpp
event_tap_ = CGEventTapCreate(
  kCGHIDEventTap,
  kCGTailAppendEventTap,
  kCGEventTapOptionListenOnly,
  mask,
  static_callback,
  this
);`}</pre>
              </div>
              <div className="text-sm text-slate-400">
                <strong>Tracked events:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Mouse down/up (all buttons)</li>
                  <li>Mouse motion and dragging</li>
                  <li>Scroll wheel events</li>
                  <li>Modifier flags changed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Event Pipeline */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Event Processing Pipeline</h2>
          <p className="text-slate-400 mb-6">
            Events flow through a deterministic queue-based transformation chain. Each stage
            processes events in timestamp order, ensuring consistent behavior.
          </p>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <div className="space-y-4">
              <PipelineStage
                number={1}
                name="merged_input_event_queue"
                description="Raw HID events from all grabbed devices merged into single queue"
                color="slate"
              />
              <PipelineArrow />
              <PipelineStage
                number={2}
                name="simple_modifications_manipulator_manager"
                description="Per-device key remaps (caps_lock → control, etc.)"
                color="green"
              />
              <PipelineArrow />
              <PipelineStage
                number={3}
                name="complex_modifications_manipulator_manager"
                description="Rules from karabiner.json with conditions, variables, multi-step actions"
                color="purple"
              />
              <PipelineArrow />
              <PipelineStage
                number={4}
                name="fn_function_keys_manipulator_manager"
                description="Rewrites media/Fn-layer keys according to profile settings"
                color="blue"
              />
              <PipelineArrow />
              <PipelineStage
                number={5}
                name="post_event_to_virtual_devices"
                description="Converts events to HID reports sent to virtual keyboard/mouse"
                color="orange"
              />
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Event Types</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <EventTypeCard
              title="Physical Events"
              color="green"
              events={[
                "momentary_switch_event (keyboard keys)",
                "pointing_motion (mouse movement)",
                "pointing_button (mouse buttons)",
              ]}
            />
            <EventTypeCard
              title="Virtual Events"
              color="purple"
              events={[
                "shell_command",
                "select_input_source",
                "set_variable",
                "software_function",
                "sticky_modifier",
              ]}
            />
            <EventTypeCard
              title="Passive Events"
              color="blue"
              events={[
                "device_grabbed / ungrabbed",
                "caps_lock_state_changed",
                "frontmost_application_changed",
                "input_source_changed",
              ]}
            />
          </div>
        </section>

        {/* Manipulator System */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Manipulator System</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4">Basic Manipulator</h3>
              <p className="text-slate-400 text-sm mb-4">
                The workhorse of Karabiner. Handles key-to-key remapping with advanced features
                like "to_if_alone" and "to_if_held_down".
              </p>
              <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300">
                <pre>{`{
  "type": "basic",
  "from": {
    "key_code": "caps_lock",
    "modifiers": { "optional": ["any"] }
  },
  "to": [
    { "key_code": "left_control" }
  ],
  "to_if_alone": [
    { "key_code": "escape" }
  ],
  "conditions": [
    {
      "type": "frontmost_application_if",
      "bundle_identifiers": ["^com\\.apple\\.Terminal$"]
    }
  ]
}`}</pre>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4">Advanced Features</h3>
              <div className="space-y-3">
                <FeatureItem
                  name="to_if_alone"
                  description="Post alternative event if key pressed in isolation (e.g., caps → escape when tapped, control when held)"
                />
                <FeatureItem
                  name="to_after_key_up"
                  description="Post additional events after physical key release"
                />
                <FeatureItem
                  name="to_if_held_down"
                  description="Different behavior for held keys with configurable threshold"
                />
                <FeatureItem
                  name="to_delayed_action"
                  description="Delay action execution (useful for hold-to-modify patterns)"
                />
                <FeatureItem
                  name="simultaneous"
                  description="Trigger when multiple keys pressed together within threshold"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Conditions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Conditions System</h2>
          <p className="text-slate-400 mb-6">
            Sophisticated filtering allows rules to activate only in specific contexts.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <ConditionCard
              name="device_if / device_unless"
              description="Filter by vendor/product ID, device type"
              example={`"vendor_id": 1452, "product_id": 832`}
            />
            <ConditionCard
              name="frontmost_application_if"
              description="App-specific rules using bundle identifiers"
              example={`"bundle_identifiers": ["^com\\.apple\\.Terminal$"]`}
            />
            <ConditionCard
              name="input_source_if"
              description="Language/keyboard layout specific rules"
              example={`"input_sources": [{ "language": "en" }]`}
            />
            <ConditionCard
              name="variable_if"
              description="Custom variables set by set_variable events"
              example={`"name": "vim_mode", "value": 1`}
            />
            <ConditionCard
              name="keyboard_type_if"
              description="Profile-specific keyboard types"
              example={`"keyboard_types": ["ansi", "iso"]`}
            />
            <ConditionCard
              name="expression_if"
              description="Complex boolean expressions"
              example={`"expression": "vim_mode == 1 && shift_held"`}
            />
          </div>
        </section>

        {/* IPC */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Inter-Process Communication</h2>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Core ⇄ Console User Server</h3>
                <div className="space-y-2 text-sm text-slate-400">
                  <div><strong>Transport:</strong> Unix datagram socket</div>
                  <div><strong>Format:</strong> MsgPack-encoded JSON</div>
                  <div><strong>Path:</strong> <code className="text-xs">/Library/Application Support/org.pqrs/tmp/krbn_core_service/*.sock</code></div>
                </div>
                <div className="mt-4 bg-slate-950 rounded-lg p-3 font-mono text-xs">
                  <div className="text-slate-500 mb-2">// Message types (operation_type)</div>
                  <ul className="text-slate-300 space-y-1">
                    <li>• connect_console_user_server</li>
                    <li>• frontmost_application_changed</li>
                    <li>• input_source_changed</li>
                    <li>• system_preferences_updated</li>
                    <li>• temporarily_ignore_all_devices</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Core ⇐ Session Monitor</h3>
                <div className="space-y-2 text-sm text-slate-400">
                  <div><strong>Purpose:</strong> Deliver console UID</div>
                  <div><strong>Path:</strong> <code className="text-xs">/Library/Application Support/org.pqrs/tmp/rootonly/krbn_session/*.sock</code></div>
                </div>
                <div className="mt-4 bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300">
                  <pre>{`// session_monitor_receiver
// Receives console UID
// Core service uses to chown
// main socket for correct user`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual HID Injection */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Virtual HID Injection</h2>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <p className="text-slate-400 mb-4">
              Instead of using <code>CGEventPost</code>, Karabiner streams events to a DriverKit virtual HID device.
              macOS consumes these reports as if they came from real hardware, ensuring special keys
              (Mission Control, Launchpad, etc.) work correctly.
            </p>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm">
              <pre className="text-slate-300">{`// post_event_to_virtual_devices.hpp
1. Front event from input queue
2. Convert to HID report:
   • momentary_switch_event → keyboard report (key codes + modifiers)
   • pointing_motion → pointing device report (x/y/buttons)
3. Send via virtual_hid_device_service_client_
4. macOS processes as real hardware input`}</pre>
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="font-semibold text-green-400 mb-2">✓ Why Virtual HID?</div>
                <ul className="text-slate-400 space-y-1">
                  <li>• Special keys work (Mission Control, etc.)</li>
                  <li>• Input Monitoring rules satisfied</li>
                  <li>• No API limitations</li>
                  <li>• Transparent to applications</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="font-semibold text-blue-400 mb-2">State Management</div>
                <ul className="text-slate-400 space-y-1">
                  <li>• Monitor driver activation</li>
                  <li>• Handle version mismatches</li>
                  <li>• Recovery from connection loss</li>
                  <li>• Re-grab devices on reconnect</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Configuration System</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4">Configuration Structure</h3>
              <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 overflow-x-auto">
                <pre>{`// ~/.config/karabiner/karabiner.json
{
  "global": {
    "check_for_updates_on_startup": true,
    "show_in_menu_bar": true
  },
  "profiles": [{
    "name": "Default",
    "selected": true,
    "simple_modifications": [...],
    "complex_modifications": {
      "rules": [...],
      "parameters": {
        "basic.to_if_alone_timeout_milliseconds": 800
      }
    },
    "devices": [{
      "identifiers": {
        "vendor_id": 1234,
        "product_id": 5678
      },
      "simple_modifications": [...]
    }]
  }]
}`}</pre>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4">Hot Reload</h3>
              <p className="text-slate-400 text-sm mb-4">
                Configuration changes are detected immediately and applied without restart.
              </p>
              <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 mb-4">
                <pre>{`// configuration_monitor.hpp
1. FSEvents watches karabiner.json
2. On modification:
   → Parse new configuration
   → Send to Core Service via socket
3. Core Service:
   → Invalidate manipulators
   → Rebuild pipeline from JSON
   → Continue processing`}</pre>
              </div>
              <div className="text-sm text-slate-400">
                <strong>Config locations:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li><code>~/.config/karabiner/karabiner.json</code></li>
                  <li><code>~/.local/share/karabiner/assets/complex_modifications/</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Startup Sequence */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Startup & Permissions Sequence</h2>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <div className="space-y-4">
              <StartupStep
                number={1}
                title="System Start"
                description="LaunchDaemon starts Karabiner-Core-Service as root"
              />
              <StartupStep
                number={2}
                title="Input Monitoring Check"
                description="Calls IOHIDRequestAccess and waits for user approval in Security & Privacy"
              />
              <StartupStep
                number={3}
                title="Session Monitor Launch"
                description="Determines console user via CGSessionCopyCurrentDictionary, notifies Core Service"
              />
              <StartupStep
                number={4}
                title="Console User Server Start"
                description="Activates virtual HID driver, registers agents (menu, notifications), connects to Core Service"
              />
              <StartupStep
                number={5}
                title="Device Grabbing"
                description="Core Service enumerates IOKit devices, seizes keyboards/mice, begins event capture"
              />
            </div>
          </div>
        </section>

        {/* Example Flow */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Example: caps_lock → control</h2>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <div className="space-y-4 text-sm">
              <FlowStep
                phase="Capture"
                description="Physical caps_lock pressed → IOHIDQueue callback → HID value (0x39) converted to momentary_switch_event → merged_input_event_queue"
              />
              <FlowStep
                phase="Simple Modifications"
                description="Manipulator matches caps_lock → control rule → Creates momentary_switch_event(left_control, key_down) → simple_modifications_applied_event_queue"
              />
              <FlowStep
                phase="Complex Modifications"
                description="No matching rules → Event passes through unchanged"
              />
              <FlowStep
                phase="Fn Keys"
                description="Not an Fn key → Event passes through"
              />
              <FlowStep
                phase="Virtual HID Injection"
                description="Convert to HID keyboard report: modifiers = LEFT_CONTROL → Send via virtual_hid_device_service_client_ → macOS sees control key pressed"
              />
            </div>
          </div>
        </section>

        {/* Security */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Security Considerations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <SecurityCard
              title="Root Privilege Justification"
              items={[
                "kIOHIDOptionsTypeSeizeDevice requires root",
                "Socket ownership managed per-user",
                "Session monitor prevents privilege escalation",
              ]}
            />
            <SecurityCard
              title="Code Signing Verification"
              items={[
                "EventViewer connections verified via team ID",
                "Prevents non-Karabiner apps from manipulating state",
              ]}
            />
            <SecurityCard
              title="Input Monitoring Permission"
              items={[
                "Requires explicit user grant in macOS settings",
                "Checked at startup and on reconnection",
              ]}
            />
            <SecurityCard
              title="Virtual HID Driver"
              items={[
                "System extension signed and notarized",
                "Loaded only after DriverKit activation",
              ]}
            />
          </div>
        </section>

        {/* File Structure */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Source Code Structure</h2>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 font-mono text-sm">
            <pre className="text-slate-300">{`/src
├── apps/                          # User-facing applications
│   ├── SettingsWindow/           # Configuration UI
│   ├── EventViewer/              # Event debugging tool
│   ├── Menu/                     # Menu bar app
│   └── MultitouchExtension/      # Trackpad gesture handler
├── core/
│   ├── CoreService/              # Main daemon (root)
│   │   └── include/core_service/
│   │       ├── device_grabber.hpp          # IOKit seizure
│   │       ├── receiver.hpp                # IPC handler
│   │       └── device_grabber_details/     # Per-device manipulators
│   ├── console_user_server/      # User context bridge
│   └── session_monitor/          # Console user detector
└── share/                        # Shared libraries
    ├── event_queue/              # Event pipeline queues
    ├── manipulator/              # Transformation system
    │   ├── manipulators/
    │   │   ├── basic/            # Simple key remapping
    │   │   ├── mouse_basic/      # Mouse manipulation
    │   │   └── post_event_to_virtual_devices/
    │   └── conditions/           # Filtering predicates
    └── monitor/                  # File/app/session monitoring`}</pre>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-800/50">
          <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>System-level capture</strong> via IOKit device seizure and CGEventTap</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Multi-process architecture</strong> with privilege separation</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Deterministic queue-based</strong> processing through manipulator chain</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Virtual HID injection</strong> for transparent event posting</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Rich condition system</strong> for context-aware remapping</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Hot-reloadable config</strong> without process restart</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function ProcessCard({
  name,
  privilege,
  color,
  description,
  path,
  features,
}: {
  name: string
  privilege: string
  color: "red" | "orange" | "blue" | "purple"
  description: string
  path: string
  features: string[]
}) {
  const colorClasses = {
    red: "from-red-500/20 to-red-600/20 border-red-800/50",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-800/50",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-800/50",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-800/50",
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-5 border`}>
      <h3 className="font-semibold mb-1">{name}</h3>
      <div className="text-xs text-slate-500 mb-3">{privilege}</div>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      <div className="text-xs text-slate-600 font-mono mb-3">{path}</div>
      <ul className="text-xs text-slate-400 space-y-1">
        {features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>
    </div>
  )
}

function PipelineStage({
  number,
  name,
  description,
  color,
}: {
  number: number
  name: string
  description: string
  color: "slate" | "green" | "purple" | "blue" | "orange"
}) {
  const colorClasses = {
    slate: "bg-slate-800 border-slate-700",
    green: "bg-green-900/30 border-green-800/50",
    purple: "bg-purple-900/30 border-purple-800/50",
    blue: "bg-blue-900/30 border-blue-800/50",
    orange: "bg-orange-900/30 border-orange-800/50",
  }

  return (
    <div className={`${colorClasses[color]} rounded-lg p-4 border`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">
          {number}
        </div>
        <div>
          <div className="font-mono text-sm font-semibold">{name}</div>
          <div className="text-xs text-slate-400">{description}</div>
        </div>
      </div>
    </div>
  )
}

function PipelineArrow() {
  return (
    <div className="flex justify-center">
      <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  )
}

function EventTypeCard({
  title,
  color,
  events,
}: {
  title: string
  color: "green" | "purple" | "blue"
  events: string[]
}) {
  const colorClasses = {
    green: "border-green-800/50 bg-green-900/20",
    purple: "border-purple-800/50 bg-purple-900/20",
    blue: "border-blue-800/50 bg-blue-900/20",
  }

  return (
    <div className={`${colorClasses[color]} rounded-xl p-4 border`}>
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="text-sm text-slate-400 space-y-1">
        {events.map((e, i) => (
          <li key={i}>• {e}</li>
        ))}
      </ul>
    </div>
  )
}

function FeatureItem({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-3">
      <div className="font-mono text-sm text-purple-400">{name}</div>
      <div className="text-xs text-slate-400 mt-1">{description}</div>
    </div>
  )
}

function ConditionCard({
  name,
  description,
  example,
}: {
  name: string
  description: string
  example: string
}) {
  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
      <div className="font-mono text-sm text-blue-400 mb-2">{name}</div>
      <p className="text-xs text-slate-400 mb-2">{description}</p>
      <code className="text-xs text-slate-500 block bg-slate-950 rounded p-2">{example}</code>
    </div>
  )
}

function StartupStep({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold shrink-0">
        {number}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-slate-400">{description}</div>
      </div>
    </div>
  )
}

function FlowStep({ phase, description }: { phase: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-purple-600/30 text-purple-300 px-2 py-1 rounded text-xs font-semibold shrink-0">
        {phase}
      </div>
      <div className="text-slate-400">{description}</div>
    </div>
  )
}

function SecurityCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="text-sm text-slate-400 space-y-1">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}
