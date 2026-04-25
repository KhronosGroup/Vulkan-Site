# GUI: Input Handling

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/GUI/03_input_handling.html

## Table of Contents

- [Input Handling](#_input_handling)
- [Creating a Platform-Agnostic Input System](#_creating_a_platform_agnostic_input_system)
- [Creating_a_Platform-Agnostic_Input_System](#_creating_a_platform_agnostic_input_system)
- [Input Prioritization](#_input_prioritization)
- [Implementing Platform Adapters for Input](#_implementing_platform_adapters_for_input)
- [Implementing_Platform_Adapters_for_Input](#_implementing_platform_adapters_for_input)
- [Example: GLFW Implementation](#_example_glfw_implementation)
- [Example:_GLFW_Implementation](#_example_glfw_implementation)
- [Input Modes](#_input_modes)
- [Handling GUI-Specific Input](#_handling_gui_specific_input)
- [Handling_GUI-Specific_Input](#_handling_gui_specific_input)
- [Integrating Input Handling with the Main Loop](#_integrating_input_handling_with_the_main_loop)
- [Integrating_Input_Handling_with_the_Main_Loop](#_integrating_input_handling_with_the_main_loop)
- [Main Loop Integration](#_main_loop_integration)
- [Main_Loop_Integration](#_main_loop_integration)
- [Advanced Input Handling Techniques](#_advanced_input_handling_techniques)
- [Advanced_Input_Handling_Techniques](#_advanced_input_handling_techniques)
- [Gesture Recognition](#_gesture_recognition)
- [Input Context System](#_input_context_system)
- [Input_Context_System](#_input_context_system)

## Content

One of the challenges when integrating a GUI into a 3D application is managing input events. We need to ensure that input events are correctly routed to either the GUI or the 3D scene. For example, if the user is interacting with a UI element, we don’t want their mouse movements to also rotate the camera.

In this section, we’ll explore how to handle input for both the GUI and the 3D scene, ensuring a smooth user experience regardless of the windowing library you choose to use.

|  | A **windowing library** is a software framework that provides functionality for creating and managing application windows, handling user input events (keyboard, mouse, touch), and interfacing with the operating system’s display and input systems. Examples include GLFW, SDL, Qt, and SFML. These libraries abstract the platform-specific details of window management and input handling, allowing developers to write code that works across different operating systems without dealing with platform-specific APIs directly. |
| --- | --- |

To create an effective input system that works with any windowing library, we need to abstract the input mechanisms and provide a clean interface. Let’s define a simple input system that can be adapted to different platforms:

// InputSystem.h
#pragma once

#include 
#include 
#include 
#include 

// Input actions that our application can respond to
enum class InputAction {
    MOVE_FORWARD,
    MOVE_BACKWARD,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP,
    MOVE_DOWN,
    LOOK_UP,
    LOOK_DOWN,
    LOOK_LEFT,
    LOOK_RIGHT,
    ZOOM_IN,
    ZOOM_OUT,
    TOGGLE_UI_MODE,
    // Add more actions as needed
};

// Input state that tracks the current state of inputs
struct InputState {
    glm::vec2 cursorPosition = {0.0f, 0.0f};
    glm::vec2 cursorDelta = {0.0f, 0.0f};
    bool mouseButtons[3] = {false, false, false};
    float scrollDelta = 0.0f;

    // For touch input
    struct TouchPoint {
        int id;
        glm::vec2 position;
        glm::vec2 delta;
    };
    std::vector touchPoints;

    // Reset delta values after each frame
    void resetDeltas() {
        cursorDelta = {0.0f, 0.0f};
        scrollDelta = 0.0f;
        for (auto& touch : touchPoints) {
            touch.delta = {0.0f, 0.0f};
        }
    }
};

class InputSystem {
public:
    static void Initialize();
    static void Shutdown();

    // Update input state (called once per frame)
    static void Update(float deltaTime);

    // Register a callback for an input action
    static void RegisterActionCallback(InputAction action, std::function callback);

    // Process a platform-specific input event
    static bool ProcessInputEvent(void* event);

    // Get the current input state
    static const InputState& GetInputState();

    // Check if ImGui is capturing input
    static bool IsImGuiCapturingKeyboard();
    static bool IsImGuiCapturingMouse();

private:
    static InputState inputState;
    static std::unordered_map> actionCallbacks;
};

The general approach for input handling in applications with both 3D navigation and GUI is:

First, check if the GUI is capturing input (e.g., mouse is over a UI element)

If the GUI is not capturing input, then process the input for 3D navigation

Let’s implement this approach using our cross-platform input system:

void processInput(float deltaTime) {
    // Check if ImGui is capturing keyboard input
    bool imguiCapturingKeyboard = InputSystem::IsImGuiCapturingKeyboard();

    // Check if ImGui is capturing mouse input
    bool imguiCapturingMouse = InputSystem::IsImGuiCapturingMouse();

    // Get the current input state
    const InputState& inputState = InputSystem::GetInputState();

    // Process keyboard input for camera movement if ImGui is not capturing keyboard
    if (!imguiCapturingKeyboard) {
        // Forward these to the camera system
        // This could be done through the action callback system
        if (InputSystem::IsActionActive(InputAction::MOVE_FORWARD))
            camera.processKeyboard(CameraMovement::FORWARD, deltaTime);
        if (InputSystem::IsActionActive(InputAction::MOVE_BACKWARD))
            camera.processKeyboard(CameraMovement::BACKWARD, deltaTime);
        if (InputSystem::IsActionActive(InputAction::MOVE_LEFT))
            camera.processKeyboard(CameraMovement::LEFT, deltaTime);
        if (InputSystem::IsActionActive(InputAction::MOVE_RIGHT))
            camera.processKeyboard(CameraMovement::RIGHT, deltaTime);
        if (InputSystem::IsActionActive(InputAction::MOVE_UP))
            camera.processKeyboard(CameraMovement::UP, deltaTime);
        if (InputSystem::IsActionActive(InputAction::MOVE_DOWN))
            camera.processKeyboard(CameraMovement::DOWN, deltaTime);
    }

    // Process mouse/touch input for camera rotation if ImGui is not capturing mouse
    if (!imguiCapturingMouse) {
        if (inputState.cursorDelta.x != 0.0f || inputState.cursorDelta.y != 0.0f) {
            camera.processMouseMovement(inputState.cursorDelta.x, -inputState.cursorDelta.y);
        }

        if (inputState.scrollDelta != 0.0f) {
            camera.processMouseScroll(inputState.scrollDelta);
        }
    }
}

While our input system design is platform-agnostic, we still need platform-specific adapters to bridge between our unified interface and each windowing library’s native input events. Here’s an example implementation using GLFW, a popular windowing library:

// InputSystem_GLFW.cpp

#include "InputSystem.h"
#include 
#include 

// Store the GLFW window pointer
static GLFWwindow* gWindow = nullptr;
static bool mouseCaptureMode = false;

// GLFW callback functions
static void glfwMouseButtonCallback(GLFWwindow* window, int button, int action, int mods) {
    if (button >= 0 && button (xpos), static_cast(ypos));
    state.cursorDelta = newPos - state.cursorPosition;
    state.cursorPosition = newPos;
}

static void glfwScrollCallback(GLFWwindow* window, double xoffset, double yoffset) {
    InputState& state = InputSystem::GetInputState();
    state.scrollDelta = static_cast(yoffset);
}

static void glfwKeyCallback(GLFWwindow* window, int key, int scancode, int action, int mods) {
    // Map GLFW keys to our input actions
    if (action == GLFW_PRESS || action == GLFW_RELEASE) {
        bool pressed = (action == GLFW_PRESS);

        // Toggle mouse capture mode with Escape key
        if (key == GLFW_KEY_ESCAPE && pressed) {
            mouseCaptureMode = !mouseCaptureMode;

            if (mouseCaptureMode) {
                glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
            } else {
                glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_NORMAL);
            }
        }

        // Map other keys to actions
        // ...
    }
}

void InputSystem::Initialize(GLFWwindow* window) {
    gWindow = window;

    // Set up GLFW callbacks
    glfwSetMouseButtonCallback(window, glfwMouseButtonCallback);
    glfwSetCursorPosCallback(window, glfwCursorPosCallback);
    glfwSetScrollCallback(window, glfwScrollCallback);
    glfwSetKeyCallback(window, glfwKeyCallback);

    // Initially capture the cursor for camera control
    mouseCaptureMode = true;
    glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
}

void InputSystem::Update(float deltaTime) {
    // Poll for input events
    glfwPollEvents();

    // Update key states for continuous actions (like movement)
    if (glfwGetKey(gWindow, GLFW_KEY_W) == GLFW_PRESS) {
        if (auto it = actionCallbacks.find(InputAction::MOVE_FORWARD); it != actionCallbacks.end()) {
            it->second(deltaTime);
        }
    }

    // ... other keys ...

    // Reset delta values after processing
    inputState.resetDeltas();
}

bool InputSystem::IsImGuiCapturingKeyboard() {
    return ImGui::GetIO().WantCaptureKeyboard;
}

bool InputSystem::IsImGuiCapturingMouse() {
    return ImGui::GetIO().WantCaptureMouse;
}

For applications that need different input modes (e.g., camera control vs. UI interaction), we can implement a mode system:

// Define input modes
enum class InputMode {
    CAMERA_CONTROL,
    UI_INTERACTION,
    OBJECT_MANIPULATION
};

// Current input mode
static InputMode currentInputMode = InputMode::CAMERA_CONTROL;

// Set the input mode
void setInputMode(InputMode mode) {
    currentInputMode = mode;

    // Update platform-specific settings based on the mode
    // This example shows how to implement this with GLFW
    if (mode == InputMode::CAMERA_CONTROL) {
        // In GLFW, we can disable the cursor for camera control
        glfwSetInputMode(gWindow, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
    } else {
        // For UI interaction, we want the cursor to be visible
        glfwSetInputMode(gWindow, GLFW_CURSOR, GLFW_CURSOR_NORMAL);
    }

    // With other windowing libraries, you would use their equivalent APIs
}

// Toggle between camera control and UI interaction modes
void toggleInputMode() {
    if (currentInputMode == InputMode::CAMERA_CONTROL) {
        setInputMode(InputMode::UI_INTERACTION);
    } else {
        setInputMode(InputMode::CAMERA_CONTROL);
    }
}

Some GUI interactions might require special handling. For example, you might want to implement drag-and-drop functionality or custom keyboard shortcuts for UI elements:

void drawGUI() {
    // Start a new ImGui frame
    ImGui::NewFrame();

    // Create a window for camera controls
    ImGui::Begin("Camera Controls");

    // Add a button to reset camera position
    if (ImGui::Button("Reset Camera")) {
        camera.setPosition(glm::vec3(0.0f, 0.0f, 3.0f));
        camera.setYaw(-90.0f);
        camera.setPitch(0.0f);
    }

    // Add sliders for camera settings
    float movementSpeed = camera.getMovementSpeed();
    if (ImGui::SliderFloat("Movement Speed", &movementSpeed, 1.0f, 10.0f)) {
        camera.setMovementSpeed(movementSpeed);
    }

    float sensitivity = camera.getMouseSensitivity();
    if (ImGui::SliderFloat("Mouse Sensitivity", &sensitivity, 0.1f, 1.0f)) {
        camera.setMouseSensitivity(sensitivity);
    }

    float zoom = camera.getZoom();
    if (ImGui::SliderFloat("Zoom", &zoom, 1.0f, 45.0f)) {
        camera.setZoom(zoom);
    }

    ImGui::End();

    // Render ImGui
    ImGui::Render();
}

Finally, let’s integrate our input handling system with the main loop:

void mainLoop() {
    // Main application loop
    while (isRunning) {
        // Calculate delta time
        float deltaTime = calculateDeltaTime();

        // Update input system
        InputSystem::Update(deltaTime);

        // Process input for camera and other systems
        processInput(deltaTime);

        // Draw GUI
        drawGUI();

        // Update uniform buffer with latest camera data
        updateUniformBuffer(currentFrame);

        // Draw frame
        drawFrame();
    }
}

The input system needs to be integrated with your application’s main loop. Here’s an example of how to do this with GLFW, but similar principles apply to other windowing libraries:

// Example main loop with GLFW
void runMainLoop() {
    // Initialize input system with your window
    // With GLFW, this would look like:
    InputSystem::Initialize(window);

    // Main loop - with GLFW, we check if the window should close
    // Other libraries would have their own condition
    while (!glfwWindowShouldClose(window)) {
        float deltaTime = calculateDeltaTime();

        // Update input and process events
        // This would be platform-specific
        InputSystem::Update(deltaTime);

        // Rest of the main loop is platform-independent
        processInput(deltaTime);
        drawGUI();
        updateUniformBuffer(currentFrame);
        drawFrame();
    }
}

For more complex applications, you might want to consider these advanced input handling techniques:

Gesture recognition can enhance the user experience regardless of which windowing library you use:

// GestureRecognizer.h
#pragma once

#include 
#include 
#include 

enum class GestureType {
    TAP,
    DOUBLE_TAP,
    LONG_PRESS,
    SWIPE,
    PINCH,
    ROTATE,
    PAN
};

struct GestureEvent {
    GestureType type;
    glm::vec2 position;
    glm::vec2 delta;
    float scale;  // For pinch
    float rotation;  // For rotate
    int pointerCount;
};

class GestureRecognizer {
public:
    static void Initialize();
    static void Update(const InputState& inputState, float deltaTime);

    // Register callbacks for different gesture types
    static void RegisterGestureCallback(GestureType type, std::function callback);

private:
    static void detectTap(const InputState& inputState);
    static void detectSwipe(const InputState& inputState);
    static void detectPinch(const InputState& inputState);
    static void detectRotate(const InputState& inputState);
    static void detectPan(const InputState& inputState);

    static std::unordered_map> gestureCallbacks;
};

For more complex applications with different input requirements in different states:

// InputContext.h
#pragma once

#include 
#include 
#include 
#include 

class InputContext {
public:
    // Create a new input context
    static void CreateContext(const std::string& name);

    // Push a context onto the stack (making it active)
    static void PushContext(const std::string& name);

    // Pop the top context from the stack
    static void PopContext();

    // Get the current active context
    static std::string GetActiveContext();

    // Register an action handler for a specific context
    static void RegisterActionHandler(const std::string& contextName, InputAction action, std::function handler);

    // Process an action in the current context
    static void ProcessAction(InputAction action, float deltaTime);

private:
    static std::unordered_map>> contextHandlers;
    static std::stack contextStack;
};

With these advanced input handling techniques, your application can provide a consistent and intuitive user experience. In the next section, we’ll explore how to create various UI elements to control your application.

[Previous: Setting Up Dear ImGui](02_imgui_setup.html) | [Next: UI Elements](04_ui_elements.html)
