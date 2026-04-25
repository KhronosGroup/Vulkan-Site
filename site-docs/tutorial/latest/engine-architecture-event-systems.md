# Engine Architecture: Event Systems

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Engine_Architecture/06_event_systems.html

## Table of Contents

- [Event Systems](#_event_systems)
- [The Need for Event Systems](#_the_need_for_event_systems)
- [The_Need_for_Event_Systems](#_the_need_for_event_systems)
- [Event System Design Principles](#_event_system_design_principles)
- [Event_System_Design_Principles](#_event_system_design_principles)
- [Basic Event System Implementation](#_basic_event_system_implementation)
- [Basic_Event_System_Implementation](#_basic_event_system_implementation)
- [Base event type and convenience macro](#_base_event_type_and_convenience_macro)
- [Base_event_type_and_convenience_macro](#_base_event_type_and_convenience_macro)
- [Concrete event types](#_concrete_event_types)
- [Concrete_event_types](#_concrete_event_types)
- [Listener and type-safe dispatcher](#_listener_and_type_safe_dispatcher)
- [Listener_and_type-safe_dispatcher](#_listener_and_type_safe_dispatcher)
- [Event bus (immediate vs. queued)](#_event_bus_immediate_vs_queued)
- [Event_bus_(immediate_vs._queued)](#_event_bus_immediate_vs_queued)
- [Using the Event System](#_using_the_event_system)
- [Using_the_Event_System](#_using_the_event_system)
- [Advanced Event System Features](#_advanced_event_system_features)
- [Advanced_Event_System_Features](#_advanced_event_system_features)
- [Event Categories](#_event_categories)
- [Event Filtering](#_event_filtering)
- [Event Priorities](#_event_priorities)
- [Event Bubbling and Capturing](#_event_bubbling_and_capturing)
- [Event_Bubbling_and_Capturing](#_event_bubbling_and_capturing)
- [Conclusion](#_conclusion)

## Content

Event systems provide a flexible way for different parts of your engine to communicate with each other without creating tight coupling. In this section, we’ll explore how to design and implement an effective event system for your rendering engine.

Even in the simple engine we’re building, subsystems need to communicate with each other efficiently. As our engine grows, these communication needs become increasingly important:

**Physics** needs to notify **Audio** when collisions occur.

**Input** needs to notify **Game Logic** when buttons are pressed.

**Game Logic** needs to notify **Rendering** when objects change.

**Resource Management** needs to notify **Rendering** when assets are loaded.

Without an event system, these interactions would require direct references between subsystems, creating tight coupling and making the code harder to maintain and extend.

When designing an event system, consider these principles:

**Decoupling** - Minimize dependencies between event producers and consumers.

**Type Safety** - Use the type system to prevent errors.

**Performance** - Efficiently dispatch events, especially for high-frequency events.

**Flexibility** - Support different event delivery patterns (immediate, queued, etc.).

**Debugging** - Make it easy to debug event flow.

Let’s implement a basic event system:

We start with a minimal base event interface and a helper macro to define strongly typed events without boilerplate.

// Base event class
class Event {
public:
    virtual ~Event() = default;

    // Get the type of the event
    virtual const char* GetType() const = 0;

    // Clone the event (for queued events)
    virtual Event* Clone() const = 0;
};

// Macro to help define event types
#define DEFINE_EVENT_TYPE(type) \
    static const char* GetStaticType() { return #type; } \
    virtual const char* GetType() const override { return GetStaticType(); } \
    virtual Event* Clone() const override { return new type(*this); }

This lets us identify and copy events generically while keeping concrete event classes small.

Keep event payloads focused and lightweight; they should represent facts, not behavior.

// Example event types
class WindowResizeEvent : public Event {
private:
    int width;
    int height;

public:
    WindowResizeEvent(int w, int h) : width(w), height(h) {}

    int GetWidth() const { return width; }
    int GetHeight() const { return height; }

    DEFINE_EVENT_TYPE(WindowResizeEvent)
};

class KeyPressEvent : public Event {
private:
    int keyCode;
    bool repeat;

public:
    KeyPressEvent(int key, bool isRepeat) : keyCode(key), repeat(isRepeat) {}

    int GetKeyCode() const { return keyCode; }
    bool IsRepeat() const { return repeat; }

    DEFINE_EVENT_TYPE(KeyPressEvent)
};

Listeners receive events; the dispatcher routes a generic Event to a typed handler when types match.

// Event listener interface
class EventListener {
public:
    virtual ~EventListener() = default;
    virtual void OnEvent(const Event& event) = 0;
};

// Event dispatcher
class EventDispatcher {
private:
    const Event& event;

public:
    explicit EventDispatcher(const Event& e) : event(e) {}

    // Dispatch event to handler if types match
    template
    bool Dispatch(const F& handler) {
        if (event.GetType() == T::GetStaticType()) {
            handler(static_cast(event));
            return true;
        }
        return false;
    }
};

The bus can deliver immediately (low latency) or queue for later (deterministic ordering across frames).

// Event bus
class EventBus {
private:
    std::vector listeners;
    std::queue> eventQueue;
    std::mutex queueMutex;
    bool immediateMode = true;

public:
    void SetImmediateMode(bool immediate) {
        immediateMode = immediate;
    }

    void AddListener(EventListener* listener) {
        listeners.push_back(listener);
    }

    void RemoveListener(EventListener* listener) {
        auto it = std::find(listeners.begin(), listeners.end(), listener);
        if (it != listeners.end()) {
            listeners.erase(it);
        }
    }

    void PublishEvent(const Event& event) {
        if (immediateMode) {
            // Dispatch event immediately
            for (auto listener : listeners) {
                listener->OnEvent(event);
            }
        } else {
            // Queue event for later processing
            std::lock_guard lock(queueMutex);
            eventQueue.push(std::unique_ptr(event.Clone()));
        }
    }

    void ProcessEvents() {
        if (immediateMode) return;

        std::queue> currentEvents;

        {
            std::lock_guard lock(queueMutex);
            std::swap(currentEvents, eventQueue);
        }

        while (!currentEvents.empty()) {
            auto& event = *currentEvents.front();

            for (auto listener : listeners) {
                listener->OnEvent(event);
            }

            currentEvents.pop();
        }
    }
};

Here’s how you might use the event system in your application:

// Component that listens for events
class CameraController : public Component, public EventListener {
private:
    CameraComponent* camera;
    float moveSpeed = 5.0f;
    float rotateSpeed = 0.1f;

    bool moveForward = false;
    bool moveBackward = false;
    bool moveLeft = false;
    bool moveRight = false;

public:
    void Initialize() override {
        camera = GetOwner()->GetComponent();

        // Register as event listener
        GetEventBus().AddListener(this);
    }

    void Update(float deltaTime) override {
        if (!camera) return;

        // Handle movement
        glm::vec3 movement(0.0f);

        if (moveForward) movement.z -= 1.0f;
        if (moveBackward) movement.z += 1.0f;
        if (moveLeft) movement.x -= 1.0f;
        if (moveRight) movement.x += 1.0f;

        if (glm::length(movement) > 0.0f) {
            movement = glm::normalize(movement) * moveSpeed * deltaTime;

            auto transform = GetOwner()->GetComponent();
            if (transform) {
                glm::vec3 position = transform->GetPosition();
                position += movement;
                transform->SetPosition(position);
            }
        }
    }

    void OnEvent(const Event& event) override {
        EventDispatcher dispatcher(event);

        // Handle key press events
        dispatcher.Dispatch([this](const KeyPressEvent& e) {
            switch (e.GetKeyCode()) {
                case KEY_W: moveForward = true; break;
                case KEY_S: moveBackward = true; break;
                case KEY_A: moveLeft = true; break;
                case KEY_D: moveRight = true; break;
            }
            return false;
        });

        // Handle key release events
        dispatcher.Dispatch([this](const KeyReleaseEvent& e) {
            switch (e.GetKeyCode()) {
                case KEY_W: moveForward = false; break;
                case KEY_S: moveBackward = false; break;
                case KEY_A: moveLeft = false; break;
                case KEY_D: moveRight = false; break;
            }
            return false;
        });

        // Handle window resize events
        dispatcher.Dispatch([this](const WindowResizeEvent& e) {
            if (camera) {
                float aspectRatio = static_cast(e.GetWidth()) / static_cast(e.GetHeight());
                camera->SetAspectRatio(aspectRatio);
            }
            return false;
        });
    }

    ~CameraController() override {
        // Unregister as event listener
        GetEventBus().RemoveListener(this);
    }

private:
    EventBus& GetEventBus() {
        // Get event bus from somewhere (e.g., singleton or parameter)
        static EventBus eventBus;
        return eventBus;
    }
};

// Input system that generates events
class InputSystem {
private:
    EventBus& eventBus;

    // Key states
    std::unordered_map keyStates;

public:
    explicit InputSystem(EventBus& bus) : eventBus(bus) {}

    void Update() {
        // Poll input events from the platform
        // ...

        // Example: Process a key press
        ProcessKeyPress(KEY_W, false);
    }

    void ProcessKeyPress(int keyCode, bool repeat) {
        bool& keyState = keyStates[keyCode];

        if (!keyState || repeat) {
            // Key was not pressed before or this is a repeat
            KeyPressEvent event(keyCode, repeat);
            eventBus.PublishEvent(event);
        }

        keyState = true;
    }

    void ProcessKeyRelease(int keyCode) {
        bool& keyState = keyStates[keyCode];

        if (keyState) {
            // Key was pressed before
            KeyReleaseEvent event(keyCode);
            eventBus.PublishEvent(event);
        }

        keyState = false;
    }
};

Events can be categorized to allow listeners to filter which types of events they receive:

// Event categories
enum class EventCategory {
    None = 0,
    Application = 1 (category);
    }
};

// Enhanced macro to define event types with categories
#define DEFINE_EVENT_TYPE_CATEGORY(type, categoryFlags) \
    static const char* GetStaticType() { return #type; } \
    virtual const char* GetType() const override { return GetStaticType(); } \
    virtual Event* Clone() const override { return new type(*this); } \
    virtual int GetCategoryFlags() const override { return categoryFlags; }

// Example event with categories
class KeyPressEvent : public Event {
private:
    int keyCode;
    bool repeat;

public:
    KeyPressEvent(int key, bool isRepeat) : keyCode(key), repeat(isRepeat) {}

    int GetKeyCode() const { return keyCode; }
    bool IsRepeat() const { return repeat; }

    DEFINE_EVENT_TYPE_CATEGORY(KeyPressEvent,
                              static_cast(EventCategory::Input) |
                              static_cast(EventCategory::Keyboard))
};

Listeners can filter events based on categories:

// Enhanced event bus with filtering
class EventBus {
private:
    struct ListenerInfo {
        EventListener* listener;
        int categoryFilter;
    };

    std::vector listeners;
    std::queue> eventQueue;
    std::mutex queueMutex;
    bool immediateMode = true;

public:
    void AddListener(EventListener* listener, int categoryFilter = -1) {
        listeners.push_back({listener, categoryFilter});
    }

    void RemoveListener(EventListener* listener) {
        auto it = std::find_if(listeners.begin(), listeners.end(),
                              [listener](const ListenerInfo& info) {
                                  return info.listener == listener;
                              });
        if (it != listeners.end()) {
            listeners.erase(it);
        }
    }

    void PublishEvent(const Event& event) {
        if (immediateMode) {
            // Dispatch event immediately
            for (const auto& info : listeners) {
                if (info.categoryFilter == -1 || (event.GetCategoryFlags() & info.categoryFilter)) {
                    info.listener->OnEvent(event);
                }
            }
        } else {
            // Queue event for later processing
            std::lock_guard lock(queueMutex);
            eventQueue.push(std::unique_ptr(event.Clone()));
        }
    }

    // Rest of the implementation...
};

Some events may need to be processed before others:

// Enhanced event bus with priorities
class EventBus {
private:
    struct ListenerInfo {
        EventListener* listener;
        int categoryFilter;
        int priority;
    };

    std::vector listeners;
    // Rest of the implementation...

public:
    void AddListener(EventListener* listener, int categoryFilter = -1, int priority = 0) {
        listeners.push_back({listener, categoryFilter, priority});

        // Sort listeners by priority (higher priority first)
        std::sort(listeners.begin(), listeners.end(),
                 [](const ListenerInfo& a, const ListenerInfo& b) {
                     return a.priority > b.priority;
                 });
    }

    // Rest of the implementation...
};

In hierarchical systems like UI, events can propagate through the hierarchy in two ways:

* 
**Event Bubbling** - The event starts at the target element and "bubbles up" through parent elements in the hierarchy. For example, a click event on a button first triggers on the button, then on its container, and continues up to the root element.

* 
**Event Capturing** - The event starts at the root element and travels down the hierarchy to the target element (the opposite direction of bubbling).

This approach allows parent elements to intercept and handle events triggered on their children, while also giving children the ability to stop propagation if needed. For hierarchical systems like UI, this provides a flexible way to handle events at the appropriate level:

// UI event with bubbling
class UIEvent : public Event {
private:
    UIElement* target;
    bool bubbles;
    bool cancelBubble = false;

public:
    UIEvent(UIElement* targetElement, bool bubbling = true)
        : target(targetElement), bubbles(bubbling) {}

    UIElement* GetTarget() const { return target; }
    bool Bubbles() const { return bubbles; }

    void StopPropagation() {
        cancelBubble = true;
    }

    bool IsPropagationStopped() const {
        return cancelBubble;
    }

    DEFINE_EVENT_TYPE_CATEGORY(UIEvent, static_cast(EventCategory::UI))
};

// UI system with event bubbling
class UISystem {
public:
    void DispatchEvent(UIEvent& event) {
        UIElement* target = event.GetTarget();

        // Capturing phase (top-down)
        std::vector path;
        UIElement* current = target;

        while (current) {
            path.push_back(current);
            current = current->GetParent();
        }

        // Dispatch to each element in the path (bottom-up)
        for (auto it = path.rbegin(); it != path.rend(); ++it) {
            (*it)->OnEvent(event);

            if (event.IsPropagationStopped()) {
                break;
            }
        }
    }
};

A well-designed event system is crucial for creating a flexible and maintainable engine architecture. By implementing the techniques described in this section, you can create a system that:

Decouples subsystems, making your code more modular and easier to maintain

Provides type-safe event handling

Supports different event delivery patterns

Can be extended with advanced features like filtering, priorities, and bubbling

This concludes our exploration of engine architecture. In this chapter, we’ve covered:

Architectural patterns for structuring your engine

Component systems for building flexible game objects

Resource management for efficiently handling assets

Rendering pipeline design for flexible and efficient rendering

Event systems for decoupled communication between subsystems

With these foundations in place, you’re well-equipped to build a robust and flexible rendering engine that can be extended to support a wide range of features and techniques.

[Previous: Rendering Pipeline](05_rendering_pipeline.html) | [Next: Conclusion](conclusion.html)
