# Engine Architecture: Component Systems

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Engine_Architecture/03_component_systems.html

## Table of Contents

- [Component Systems](#_component_systems)
- [The Problem with Deep Inheritance](#_the_problem_with_deep_inheritance)
- [The_Problem_with_Deep_Inheritance](#_the_problem_with_deep_inheritance)
- [Component-Based Design Principles](#_component_based_design_principles)
- [Component-Based_Design_Principles](#_component_based_design_principles)
- [Basic Component System Implementation](#_basic_component_system_implementation)
- [Basic_Component_System_Implementation](#_basic_component_system_implementation)
- [Common Component Types](#_common_component_types)
- [Common_Component_Types](#_common_component_types)
- [Component Communication](#_component_communication)
- [Direct References](#_direct_references)
- [Event System](#_event_system)
- [Component Lifecycle Management](#_component_lifecycle_management)
- [Component_Lifecycle_Management](#_component_lifecycle_management)
- [Optimizing Component Access](#_optimizing_component_access)
- [Optimizing_Component_Access](#_optimizing_component_access)
- [Conclusion](#_conclusion)

## Content

In the previous section, we introduced several architectural patterns and explained why we’re focusing on component-based architecture for our Vulkan rendering engine. As we established, component systems provide the ideal balance of flexibility, modularity, and performance for modern rendering engines. Now, let’s dive deeper into how to implement effective component systems in your rendering engine.

Traditional game object systems often rely on deep inheritance hierarchies:

class GameObject { /* ... */ };
class PhysicalObject : public GameObject { /* ... */ };
class Character : public PhysicalObject { /* ... */ };
class Player : public Character { /* ... */ };
class Enemy : public Character { /* ... */ };
class FlyingEnemy : public Enemy { /* ... */ };
// And so on...

This approach has several drawbacks:

**Rigidity** - Adding new combinations of behaviors requires creating new classes.

**Code Duplication** - Similar functionality may be duplicated across different branches of the hierarchy.

**Bloated Classes** - Base classes tend to accumulate functionality over time.

**Difficult Refactoring** - Changes to base classes can have far-reaching consequences.

Component-based design addresses these issues by favoring composition over inheritance:

**Single Responsibility** - Each component should have a single, well-defined responsibility.

**Encapsulation** - Components should encapsulate their internal state and behavior.

**Loose Coupling** - Components should minimize dependencies on other components.

**Reusability** - Components should be designed for reuse across different entity types.

Let’s build a more complete component system based on the example from the previous section:

// Forward declarations
class Entity;

// Base component class
class Component {
protected:
    Entity* owner = nullptr;

public:
    virtual ~Component() = default;

    virtual void Initialize() {}
    virtual void Update(float deltaTime) {}
    virtual void Render() {}

    void SetOwner(Entity* entity) { owner = entity; }
    Entity* GetOwner() const { return owner; }
};

// Entity class
class Entity {
private:
    std::string name;
    bool active = true;
    std::vector> components;

public:
    explicit Entity(const std::string& entityName) : name(entityName) {}

    const std::string& GetName() const { return name; }
    bool IsActive() const { return active; }
    void SetActive(bool isActive) { active = isActive; }

    void Initialize() {
        for (auto& component : components) {
            component->Initialize();
        }
    }

    void Update(float deltaTime) {
        if (!active) return;

        for (auto& component : components) {
            component->Update(deltaTime);
        }
    }

    void Render() {
        if (!active) return;

        for (auto& component : components) {
            component->Render();
        }
    }

    template
    T* AddComponent(Args&&... args) {
        static_assert(std::is_base_of::value, "T must derive from Component");

        // Create new component
        auto component = std::make_unique(std::forward(args)...);
        T* componentPtr = component.get();
        componentPtr->SetOwner(this);
        components.push_back(std::move(component));
        return componentPtr;
    }

    template
    T* GetComponent() {
        for (auto& component : components) {
            if (T* result = dynamic_cast(component.get())) {
                return result;
            }
        }
        return nullptr;
    }

    template
    bool RemoveComponent() {
        for (auto it = components.begin(); it != components.end(); ++it) {
            if (dynamic_cast(it->get())) {
                components.erase(it);
                return true;
            }
        }
        return false;
    }
};

Let’s implement some common component types that you might use in a rendering engine:

// Transform component
// Handles the position, rotation, and scale of an entity in 3D space
// AffineTransform or "Pose" matrix.
class TransformComponent : public Component {
private:
    glm::vec3 position = glm::vec3(0.0f);
    glm::quat rotation = glm::quat(1.0f, 0.0f, 0.0f, 0.0f); // Identity quaternion
    glm::vec3 scale = glm::vec3(1.0f);

    // Cached transformation matrix
    mutable glm::mat4 transformMatrix = glm::mat4(1.0f);
    mutable bool transformDirty = true;

public:
    void SetPosition(const glm::vec3& pos) {
        position = pos;
        transformDirty = true;
    }

    void SetRotation(const glm::quat& rot) {
        rotation = rot;
        transformDirty = true;
    }

    void SetScale(const glm::vec3& s) {
        scale = s;
        transformDirty = true;
    }

    const glm::vec3& GetPosition() const { return position; }
    const glm::quat& GetRotation() const { return rotation; }
    const glm::vec3& GetScale() const { return scale; }

    glm::mat4 GetTransformMatrix() const {
        if (transformDirty) {
            // Calculate transformation matrix
            glm::mat4 translationMatrix = glm::translate(glm::mat4(1.0f), position);
            glm::mat4 rotationMatrix = glm::mat4_cast(rotation);
            glm::mat4 scaleMatrix = glm::scale(glm::mat4(1.0f), scale);

            transformMatrix = translationMatrix * rotationMatrix * scaleMatrix;
            transformDirty = false;
        }
        return transformMatrix;
    }
};

// Mesh component
// Manages the visual representation of an entity by handling its 3D mesh and material
class MeshComponent : public Component {
private:
    Mesh* mesh = nullptr;
    Material* material = nullptr;

public:
    MeshComponent(Mesh* m, Material* mat) : mesh(m), material(mat) {}

    void SetMesh(Mesh* m) { mesh = m; }
    void SetMaterial(Material* mat) { material = mat; }

    Mesh* GetMesh() const { return mesh; }
    Material* GetMaterial() const { return material; }

    void Render() override {
        if (!mesh || !material) return;

        // Get transform component
        auto transform = GetOwner()->GetComponent();
        if (!transform) return;

        // Render mesh with material and transform
        material->Bind();
        material->SetUniform("modelMatrix", transform->GetTransformMatrix());
        mesh->Render();
    }
};

// Camera component
// Defines a viewpoint for rendering the scene by managing view and projection matrices
class CameraComponent : public Component {
private:
    float fieldOfView = 45.0f;
    float aspectRatio = 16.0f / 9.0f;
    float nearPlane = 0.1f;
    float farPlane = 1000.0f;

    glm::mat4 viewMatrix = glm::mat4(1.0f);
    glm::mat4 projectionMatrix = glm::mat4(1.0f);
    bool projectionDirty = true;

public:
    void SetPerspective(float fov, float aspect, float near, float far) {
        fieldOfView = fov;
        aspectRatio = aspect;
        nearPlane = near;
        farPlane = far;
        projectionDirty = true;
    }

    glm::mat4 GetViewMatrix() const {
        // Get transform component
        auto transform = GetOwner()->GetComponent();
        if (transform) {
            // Calculate view matrix from transform
            glm::vec3 position = transform->GetPosition();
            glm::quat rotation = transform->GetRotation();

            // Forward vector (local -Z)
            glm::vec3 forward = rotation * glm::vec3(0.0f, 0.0f, -1.0f);
            // Up vector (local +Y)
            glm::vec3 up = rotation * glm::vec3(0.0f, 1.0f, 0.0f);

            return glm::lookAt(position, position + forward, up);
        }
        return glm::mat4(1.0f);
    }

    glm::mat4 GetProjectionMatrix() const {
        if (projectionDirty) {
            projectionMatrix = glm::perspective(
                glm::radians(fieldOfView),
                aspectRatio,
                nearPlane,
                farPlane
            );
            projectionDirty = false;
        }
        return projectionMatrix;
    }
};

Components often need to communicate with each other. There are several approaches to component communication:

The simplest approach is to use direct references:

void MeshComponent::Update(float deltaTime) {
    auto transform = GetOwner()->GetComponent();
    if (transform) {
        // Use transform data
    }
}

This approach is straightforward but creates tight coupling between
components.  Tight coupling makes it challenging or impossible to create
unit tests and properly test the engine, so this approach should be avoided
in production code.

A more flexible approach is to use an event system:

// Event base class
class Event {
public:
    virtual ~Event() = default;
};

// Specific event types
class CollisionEvent : public Event {
private:
    Entity* entity1;
    Entity* entity2;

public:
    CollisionEvent(Entity* e1, Entity* e2) : entity1(e1), entity2(e2) {}

    Entity* GetEntity1() const { return entity1; }
    Entity* GetEntity2() const { return entity2; }
};

// Event listener interface
class EventListener {
public:
    virtual ~EventListener() = default;
    virtual void OnEvent(const Event& event) = 0;
};

// Event system
class EventSystem {
private:
    std::vector listeners;

public:
    void AddListener(EventListener* listener) {
        listeners.push_back(listener);
    }

    void RemoveListener(EventListener* listener) {
        auto it = std::find(listeners.begin(), listeners.end(), listener);
        if (it != listeners.end()) {
            listeners.erase(it);
        }
    }

    void DispatchEvent(const Event& event) {
        for (auto listener : listeners) {
            listener->OnEvent(event);
        }
    }
};

// Component that listens for events
// Handles physics-related behavior and responds to collision events through the event system
class PhysicsComponent : public Component, public EventListener {
public:
    void Initialize() override {
        // Register as event listener
        GetEventSystem().AddListener(this);
    }

    ~PhysicsComponent() override {
        // Unregister as event listener
        GetEventSystem().RemoveListener(this);
    }

    void OnEvent(const Event& event) override {
        if (auto collisionEvent = dynamic_cast(&event)) {
            // Handle collision event
        }
    }

private:
    EventSystem& GetEventSystem() {
        // Get event system from somewhere (e.g., service locator)
        static EventSystem eventSystem;
        return eventSystem;
    }
};

This approach decouples components but adds complexity.  Crucially, a
decoupled component is a component that can be tested independently of any
other component.

Managing the lifecycle of components is crucial for a robust component system:

class Component {
public:
    enum class State {
        Uninitialized,
        Initializing,
        Active,
        Destroying,
        Destroyed
    };

private:
    State state = State::Uninitialized;
    Entity* owner = nullptr;

public:
    virtual ~Component() {
        if (state != State::Destroyed) {
            OnDestroy();
            state = State::Destroyed;
        }
    }

    void Initialize() {
        if (state == State::Uninitialized) {
            state = State::Initializing;
            OnInitialize();
            state = State::Active;
        }
    }

    void Destroy() {
        if (state == State::Active) {
            state = State::Destroying;
            OnDestroy();
            state = State::Destroyed;
        }
    }

    bool IsActive() const { return state == State::Active; }

    void SetOwner(Entity* entity) { owner = entity; }
    Entity* GetOwner() const { return owner; }

protected:
    virtual void OnInitialize() {}
    virtual void OnDestroy() {}
    virtual void Update(float deltaTime) {}
    virtual void Render() {}

    friend class Entity; // Allow Entity to call protected methods
};

The `GetComponent()` method shown earlier uses dynamic_cast, which can be slow. Here’s an optimized approach using component type IDs:

// Component type ID system
class ComponentTypeIDSystem {
private:
    static size_t nextTypeID;

public:
    template
    static size_t GetTypeID() {
        static size_t typeID = nextTypeID++;
        return typeID;
    }
};

size_t ComponentTypeIDSystem::nextTypeID = 0;

// Component base class with type ID
class Component {
public:
    virtual ~Component() = default;

    template
    static size_t GetTypeID() {
        return ComponentTypeIDSystem::GetTypeID();
    }
};

// Entity with optimized component access
class Entity {
private:
    std::vector> components;
    std::unordered_map componentMap;

public:
    template
    T* AddComponent(Args&&... args) {
        static_assert(std::is_base_of::value, "T must derive from Component");

        size_t typeID = Component::GetTypeID();

        // Check if component of this type already exists
        auto it = componentMap.find(typeID);
        if (it != componentMap.end()) {
            return static_cast(it->second);
        }

        // Create new component
        auto component = std::make_unique(std::forward(args)...);
        T* componentPtr = component.get();
        componentMap[typeID] = componentPtr;
        components.push_back(std::move(component));
        return componentPtr;
    }

    template
    T* GetComponent() {
        size_t typeID = Component::GetTypeID();
        auto it = componentMap.find(typeID);
        if (it != componentMap.end()) {
            return static_cast(it->second);
        }
        return nullptr;
    }

    template
    bool RemoveComponent() {
        size_t typeID = Component::GetTypeID();
        auto it = componentMap.find(typeID);
        if (it != componentMap.end()) {
            Component* componentPtr = it->second;
            componentMap.erase(it);

            for (auto compIt = components.begin(); compIt != components.end(); ++compIt) {
                if (compIt->get() == componentPtr) {
                    components.erase(compIt);
                    return true;
                }
            }
        }
        return false;
    }
};

Component systems provide a flexible and modular approach to building game objects in your engine. By following the principles outlined in this section, you can create a robust component system that:

Promotes code reuse through composition

Reduces coupling between different parts of your engine

Allows for flexible entity creation without deep inheritance hierarchies

Can be optimized for performance

In the next section, we’ll explore resource management systems, which are crucial for efficiently handling assets in your engine.

[Previous: Architectural Patterns](02_architectural_patterns.html) | [Next: Resource Management](04_resource_management.html)
