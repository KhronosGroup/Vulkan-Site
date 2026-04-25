# Windowing, Audio, and Input

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/windowing_audio_input.html

## Table of Contents

- [Overview](#_overview)
- [Window Creation](#_window_creation)
- [GLFW](#_glfw)
- [Setting Up GLFW with Vulkan](#_setting_up_glfw_with_vulkan)
- [Setting_Up_GLFW_with_Vulkan](#_setting_up_glfw_with_vulkan)
- [GLFW Input Handling](#_glfw_input_handling)
- [GLFW_Input_Handling](#_glfw_input_handling)
- [SDL2](#_sdl2)
- [Setting Up SDL2 with Vulkan](#_setting_up_sdl2_with_vulkan)
- [Setting_Up_SDL2_with_Vulkan](#_setting_up_sdl2_with_vulkan)
- [SDL2 Input Handling](#_sdl2_input_handling)
- [SDL2_Input_Handling](#_sdl2_input_handling)
- [SDL2 Audio Integration](#_sdl2_audio_integration)
- [SDL2_Audio_Integration](#_sdl2_audio_integration)
- [SFML](#_sfml)
- [Setting up SFML with Vulkan](#_setting_up_sfml_with_vulkan)
- [Setting_up_SFML_with_Vulkan](#_setting_up_sfml_with_vulkan)
- [SFML Input Handling](#_sfml_input_handling)
- [SFML_Input_Handling](#_sfml_input_handling)
- [SFML Audio Integration](#_sfml_audio_integration)
- [SFML_Audio_Integration](#_sfml_audio_integration)
- [Native Platform APIs](#_native_platform_apis)
- [Native_Platform_APIs](#_native_platform_apis)
- [Windows (Win32)](#_windows_win32)
- [Linux (XCB)](#_linux_xcb)
- [Linux (Wayland)](#_linux_wayland)
- [macOS (Cocoa)](#_macos_cocoa)
- [iOS (UIKit)](#_ios_uikit)
- [Android](#_android)
- [Audio Integration](#_audio_integration)
- [OpenAL](#_openal)
- [FMOD](#_fmod)
- [Mobile Audio Integration](#_mobile_audio_integration)
- [Mobile_Audio_Integration](#_mobile_audio_integration)
- [Android Audio](#_android_audio)
- [Oboe](#_oboe)
- [Android Audio Focus](#_android_audio_focus)
- [Android_Audio_Focus](#_android_audio_focus)
- [iOS Audio](#_ios_audio)
- [AVAudioEngine](#_avaudioengine)
- [Core Audio](#_core_audio)
- [iOS Audio Session](#_ios_audio_session)
- [iOS_Audio_Session](#_ios_audio_session)
- [Mobile Audio Considerations](#_mobile_audio_considerations)
- [Mobile_Audio_Considerations](#_mobile_audio_considerations)
- [Battery Usage](#_battery_usage)
- [Memory Management](#_memory_management)
- [Interruptions and Audio Focus](#_interruptions_and_audio_focus)
- [Interruptions_and_Audio_Focus](#_interruptions_and_audio_focus)
- [Latency](#_latency)
- [Integrating with Vulkan](#_integrating_with_vulkan)
- [Integrating_with_Vulkan](#_integrating_with_vulkan)
- [Surface Creation](#_surface_creation)
- [Swapchain Management](#_swapchain_management)
- [Input to Vulkan Rendering](#_input_to_vulkan_rendering)
- [Input_to_Vulkan_Rendering](#_input_to_vulkan_rendering)
- [Best Practices](#_best_practices)
- [Performance Considerations](#_performance_considerations)
- [Cross-Platform Development](#_cross_platform_development)
- [Error Handling](#_error_handling)
- [Resources](#_resources)
- [Libraries](#_libraries)
- [Examples and Tutorials](#_examples_and_tutorials)
- [Examples_and_Tutorials](#_examples_and_tutorials)
- [Documentation](#_documentation)

## Content

This chapter provides boilerplate examples for integrating libraries like GLFW, SDL2, and native platform APIs for window creation and input handling with Vulkan applications.

While Vulkan itself is a graphics and compute API, most applications need to interact with the operating system to create windows, handle user input, and potentially process audio. This chapter covers the most common libraries and approaches for these tasks when developing Vulkan applications.

[GLFW](https://www.glfw.org/) is a lightweight, multi-platform library for creating windows, contexts, and surfaces, receiving input and events. It’s particularly popular for Vulkan development due to its simple API and built-in Vulkan support.

#define GLFW_INCLUDE_VULKAN
#include 
#include 

int main() {
    // Initialize GLFW
    if (!glfwInit()) {
        std::cerr 

GLFW provides both polling and callback-based approaches for input handling:

// Callback for keyboard input
void keyCallback(GLFWwindow* window, int key, int scancode, int action, int mods) {
    if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS) {
        glfwSetWindowShouldClose(window, GLFW_TRUE);
    }
}

// Callback for mouse movement
void cursorPositionCallback(GLFWwindow* window, double xpos, double ypos) {
    // Handle mouse movement
    std::cout 

[SDL2](https://www.libsdl.org/) (Simple DirectMedia Layer) is a cross-platform development library designed to provide low-level access to audio, keyboard, mouse, joystick, and graphics hardware. It’s more comprehensive than GLFW, offering audio support and more input options.

#include 
#include 
#include 
#include 
#include 

int main() {
    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO) != 0) {
        std::cerr  extensions(extensionCount);
    if (!SDL_Vulkan_GetInstanceExtensions(window, &extensionCount, extensions.data())) {
        std::cerr 

SDL2 uses an event-based system for input handling:

// In the main loop
SDL_Event event;
while (SDL_PollEvent(&event)) {
    switch (event.type) {
        case SDL_QUIT:
            running = false;
            break;
        case SDL_KEYDOWN:
            if (event.key.keysym.sym == SDLK_ESCAPE) {
                running = false;
            }
            if (event.key.keysym.sym == SDLK_w) {
                // Move forward
            }
            break;
        case SDL_MOUSEMOTION:
            std::cout 

SDL2 provides a simple audio API:

// Audio callback function
void audioCallback(void* userdata, Uint8* stream, int len) {
    // Fill the stream buffer with audio data
    // For example, generate a sine wave
    static double phase = 0.0;
    double frequency = 440.0; // A4 note
    double amplitude = 0.25;  // Volume

    for (int i = 0; i  2.0 * M_PI) {
            phase -= 2.0 * M_PI;
        }
    }
}

// Set up audio
SDL_AudioSpec want, have;
SDL_memset(&want, 0, sizeof(want));
want.freq = 44100;
want.format = AUDIO_U8;
want.channels = 1;
want.samples = 4096;
want.callback = audioCallback;

SDL_AudioDeviceID audioDevice = SDL_OpenAudioDevice(NULL, 0, &want, &have, 0);
if (audioDevice == 0) {
    std::cerr 

[SFML](https://www.sfml-dev.org/) (Simple and Fast Multimedia Library) is a multi-platform C++ library designed to provide a simple interface to various multi-media components, such as input, audio and graphics. Compared to GLFW, SFML offers a more extensive set of features and supports more platforms like mobile.

#include 
#include 
#include 
#include 

int main() {
    // Create SFML window
    sf::WindowBase window{sf::VideoMode({800, 600}), "Vulkan SFML Window", sf::Style::Default};

    // Get required Vulkan extensions for SFML
    std::vector extensions = sf::Vulkan::getGraphicsRequiredInstanceExtensions();

    // Create Vulkan instance (not shown)
    VkInstance instance = VK_NULL_HANDLE;
    // ... create instance with extensions ...

    // Create Vulkan surface
    VkSurfaceKHR surface;
    if (!window.createVulkanSurface(instance, surface)) {
        std::cerr is()) {
                window.close();
            }
        }

        // Render with Vulkan (not shown)
    }

    vkDestroySurfaceKHR(instance, surface, nullptr);
    // No explicit SFML cleanup required

    return 0;
}

// In the main loop
while (window.isOpen()) {
    while (const std::optional event = window.pollEvent()) {
        if (event->is()) {
            window.close();
        }
        if (event->is()) {
            if (event->getIf()->code == sf::Keyboard::Key::W) {
                // Move forwards
            }
        }
        if (event->is()) {
            if (event->getIf()->button == sf::Mouse::Button::Left) {
                // Pick object
            }
        }
    }
}

// Alternatively, poll key state
if (sf::Keyboard::isKeyPressed(sf::Keyboard::Key::W)) {
    // Move forward
}

SFML provides a simple audio and music API:

// Load a sound buffer from a wav file
const sf::SoundBuffer buffer("soundfile.wav");
// Create a sound instance of the sound buffer
sf::Sound sound(buffer);
// Play it
sound.play();

// Load a music track
sf::Music music("soundtrack.ogg");
// Play it
music.play();

For applications requiring more direct control or platform-specific features, you can use native APIs for window creation and input handling.

#define VK_USE_PLATFORM_WIN32_KHR
#include 
#include 
#include 

// Window procedure
LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
        case WM_CLOSE:
            PostQuitMessage(0);
            return 0;
        case WM_KEYDOWN:
            if (wParam == VK_ESCAPE) {
                PostQuitMessage(0);
            }
            return 0;
        case WM_LBUTTONDOWN:
            std::cout 

#define VK_USE_PLATFORM_XCB_KHR
#include 
#include 
#include 

int main() {
    // Connect to X server
    xcb_connection_t* connection = xcb_connect(NULL, NULL);
    if (xcb_connection_has_error(connection)) {
        std::cerr black_pixel,
        XCB_EVENT_MASK_KEY_PRESS | XCB_EVENT_MASK_BUTTON_PRESS | XCB_EVENT_MASK_POINTER_MOTION | XCB_EVENT_MASK_STRUCTURE_NOTIFY
    };

    xcb_create_window(
        connection,
        XCB_COPY_FROM_PARENT,
        window,
        screen->root,
        0, 0,
        800, 600,
        0,
        XCB_WINDOW_CLASS_INPUT_OUTPUT,
        screen->root_visual,
        value_mask,
        value_list
    );

    // Set window title
    xcb_change_property(
        connection,
        XCB_PROP_MODE_REPLACE,
        window,
        XCB_ATOM_WM_NAME,
        XCB_ATOM_STRING,
        8,
        13,
        "Vulkan Window"
    );

    // Map window
    xcb_map_window(connection, window);
    xcb_flush(connection);

    // Create Vulkan instance (not shown)
    VkInstance instance = VK_NULL_HANDLE;
    // ... create instance ...

    // Create Vulkan surface
    VkXcbSurfaceCreateInfoKHR createInfo = {};
    createInfo.sType = VK_STRUCTURE_TYPE_XCB_SURFACE_CREATE_INFO_KHR;
    createInfo.connection = connection;
    createInfo.window = window;

    VkSurfaceKHR surface;
    VkResult result = vkCreateXcbSurfaceKHR(instance, &createInfo, nullptr, &surface);
    if (result != VK_SUCCESS) {
        std::cerr response_type & 0x7f) {
                case XCB_CLIENT_MESSAGE:
                    running = false;
                    break;
                case XCB_KEY_PRESS: {
                    xcb_key_press_event_t* keyEvent = (xcb_key_press_event_t*)event;
                    // Handle key press
                    break;
                }
                case XCB_BUTTON_PRESS: {
                    xcb_button_press_event_t* buttonEvent = (xcb_button_press_event_t*)event;
                    // Handle button press
                    break;
                }
                case XCB_MOTION_NOTIFY: {
                    xcb_motion_notify_event_t* motionEvent = (xcb_motion_notify_event_t*)event;
                    // Handle mouse motion
                    break;
                }
            }
            free(event);
        }

        // Render with Vulkan (not shown)
    }

    // Cleanup
    vkDestroySurfaceKHR(instance, surface, nullptr);
    xcb_destroy_window(connection, window);
    xcb_disconnect(connection);

    return 0;
}

[Wayland](https://wayland.freedesktop.org/) is a modern display server protocol for Linux that aims to replace the X Window System. It provides a simpler, more efficient, and more secure architecture for graphical applications.

#define VK_USE_PLATFORM_WAYLAND_KHR
#include 
#include 
#include 
#include 

// Wayland protocol listeners
struct WaylandData {
    wl_display* display;
    wl_registry* registry;
    wl_compositor* compositor;
    wl_shell* shell;
    wl_surface* surface;
    wl_shell_surface* shellSurface;
    bool running;
};

// Registry listener callbacks
static void registry_global(void* data, wl_registry* registry, uint32_t id, const char* interface, uint32_t version) {
    WaylandData* waylandData = static_cast(data);

    if (strcmp(interface, "wl_compositor") == 0) {
        waylandData->compositor = static_cast(
            wl_registry_bind(registry, id, &wl_compositor_interface, 1)
        );
    } else if (strcmp(interface, "wl_shell") == 0) {
        waylandData->shell = static_cast(
            wl_registry_bind(registry, id, &wl_shell_interface, 1)
        );
    }
}

static void registry_global_remove(void* data, wl_registry* registry, uint32_t name) {
    // Handle removed global
}

static const wl_registry_listener registry_listener = {
    registry_global,
    registry_global_remove
};

// Shell surface listener callbacks
static void shell_surface_ping(void* data, wl_shell_surface* shell_surface, uint32_t serial) {
    wl_shell_surface_pong(shell_surface, serial);
}

static void shell_surface_configure(void* data, wl_shell_surface* shell_surface, uint32_t edges, int32_t width, int32_t height) {
    // Handle resize
}

static void shell_surface_popup_done(void* data, wl_shell_surface* shell_surface) {
    // Handle popup done
}

static const wl_shell_surface_listener shell_surface_listener = {
    shell_surface_ping,
    shell_surface_configure,
    shell_surface_popup_done
};

int main() {
    WaylandData waylandData = {};

    // Connect to Wayland display
    waylandData.display = wl_display_connect(nullptr);
    if (!waylandData.display) {
        std::cerr 

[Cocoa](https://developer.apple.com/documentation/appkit) is Apple’s native object-oriented API for macOS application development. For Vulkan applications on macOS, you typically use MoltenVK, which translates Vulkan calls to Metal.

#define VK_USE_PLATFORM_MACOS_MVK
#include 
#include 
#include 

// Cocoa application delegate
@interface VulkanAppDelegate : NSObject 
@end

@implementation VulkanAppDelegate
- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)sender {
    return YES;
}
@end

// Cocoa window delegate
@interface VulkanWindowDelegate : NSObject 
@end

@implementation VulkanWindowDelegate
- (void)windowWillClose:(NSNotification *)notification {
    [NSApp terminate:nil];
}
@end

// Cocoa view for rendering
@interface VulkanView : NSView
@end

@implementation VulkanView
- (BOOL)acceptsFirstResponder {
    return YES;
}

- (void)keyDown:(NSEvent *)event {
    if ([[event characters] isEqualToString:@"\033"]) { // Escape key
        [NSApp terminate:nil];
    }
}

- (void)mouseDown:(NSEvent *)event {
    NSPoint point = [self convertPoint:[event locationInWindow] fromView:nil];
    std::cout 

[UIKit](https://developer.apple.com/documentation/uikit) is Apple’s framework for building user interfaces for iOS applications. Similar to macOS, Vulkan applications on iOS typically use MoltenVK.

#define VK_USE_PLATFORM_IOS_MVK
#include 
#include 
#include 

// UIView subclass for Vulkan rendering
@interface VulkanView : UIView
@end

@implementation VulkanView
+ (Class)layerClass {
    return [CAMetalLayer class];
}
@end

// UIViewController for the Vulkan view
@interface VulkanViewController : UIViewController
@property (nonatomic, strong) VulkanView *vulkanView;
@property (nonatomic, assign) VkInstance instance;
@property (nonatomic, assign) VkSurfaceKHR surface;
@end

@implementation VulkanViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    // Create Vulkan view
    self.vulkanView = [[VulkanView alloc] initWithFrame:self.view.bounds];
    self.vulkanView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    [self.view addSubview:self.vulkanView];

    // Create Vulkan instance (not shown)
    // ... create instance with VK_MVK_ios_surface extension ...

    // Create Vulkan surface
    VkIOSSurfaceCreateInfoMVK createInfo = {};
    createInfo.sType = VK_STRUCTURE_TYPE_IOS_SURFACE_CREATE_INFO_MVK;
    createInfo.pView = (__bridge void*)self.vulkanView;

    VkResult result = vkCreateIOSSurfaceMVK(self.instance, &createInfo, nullptr, &self.surface);
    if (result != VK_SUCCESS) {
        NSLog(@"Failed to create iOS surface for Vulkan");
    }
}

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
    UITouch *touch = [touches anyObject];
    CGPoint point = [touch locationInView:self.vulkanView];
    NSLog(@"Touch began at: %f, %f", point.x, point.y);
}

- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
    UITouch *touch = [touches anyObject];
    CGPoint point = [touch locationInView:self.vulkanView];
    NSLog(@"Touch moved to: %f, %f", point.x, point.y);
}

- (void)dealloc {
    if (self.surface != VK_NULL_HANDLE) {
        vkDestroySurfaceKHR(self.instance, self.surface, nullptr);
    }
}
@end

// AppDelegate
@interface AppDelegate : UIResponder 
@property (strong, nonatomic) UIWindow *window;
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.window.rootViewController = [[VulkanViewController alloc] init];
    [self.window makeKeyAndVisible];
    return YES;
}

@end

int main(int argc, char * argv[]) {
    @autoreleasepool {
        return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
    }
}

[Android](https://developer.android.com/) is Google’s mobile operating system. Vulkan is natively supported on Android 7.0 (API level 24) and higher.

#define VK_USE_PLATFORM_ANDROID_KHR
#include 
#include 
#include 
#include 

#define LOGI(...) ((void)__android_log_print(ANDROID_LOG_INFO, "VulkanApp", __VA_ARGS__))
#define LOGW(...) ((void)__android_log_print(ANDROID_LOG_WARN, "VulkanApp", __VA_ARGS__))
#define LOGE(...) ((void)__android_log_print(ANDROID_LOG_ERROR, "VulkanApp", __VA_ARGS__))

// Global application state
struct AppState {
    ANativeWindow* window;
    VkInstance instance;
    VkSurfaceKHR surface;
    bool running;
};

// Process Android input events
static int32_t handleInput(struct android_app* app, AInputEvent* event) {
    AppState* appState = (AppState*)app->userData;

    if (AInputEvent_getType(event) == AINPUT_EVENT_TYPE_MOTION) {
        float x = AMotionEvent_getX(event, 0);
        float y = AMotionEvent_getY(event, 0);

        switch (AMotionEvent_getAction(event) & AMOTION_EVENT_ACTION_MASK) {
            case AMOTION_EVENT_ACTION_DOWN:
                LOGI("Touch down at: %f, %f", x, y);
                return 1;
            case AMOTION_EVENT_ACTION_MOVE:
                LOGI("Touch moved to: %f, %f", x, y);
                return 1;
            case AMOTION_EVENT_ACTION_UP:
                LOGI("Touch up at: %f, %f", x, y);
                return 1;
        }
    } else if (AInputEvent_getType(event) == AINPUT_EVENT_TYPE_KEY) {
        int32_t keyCode = AKeyEvent_getKeyCode(event);
        if (keyCode == AKEYCODE_BACK) {
            appState->running = false;
            return 1;
        }
    }

    return 0;
}

// Process Android application commands
static void handleCmd(struct android_app* app, int32_t cmd) {
    AppState* appState = (AppState*)app->userData;

    switch (cmd) {
        case APP_CMD_INIT_WINDOW:
            if (app->window != NULL) {
                appState->window = app->window;

                // Create Vulkan instance (not shown)
                // ... create instance with VK_KHR_android_surface extension ...

                // Create Vulkan surface
                VkAndroidSurfaceCreateInfoKHR createInfo = {};
                createInfo.sType = VK_STRUCTURE_TYPE_ANDROID_SURFACE_CREATE_INFO_KHR;
                createInfo.window = appState->window;

                VkResult result = vkCreateAndroidSurfaceKHR(appState->instance, &createInfo, nullptr, &appState->surface);
                if (result != VK_SUCCESS) {
                    LOGE("Failed to create Android surface for Vulkan");
                }
            }
            break;
        case APP_CMD_TERM_WINDOW:
            // Clean up the surface when the window is closed
            if (appState->surface != VK_NULL_HANDLE) {
                vkDestroySurfaceKHR(appState->instance, appState->surface, nullptr);
                appState->surface = VK_NULL_HANDLE;
            }
            appState->window = nullptr;
            break;
        case APP_CMD_GAINED_FOCUS:
            // App gained focus, start rendering
            break;
        case APP_CMD_LOST_FOCUS:
            // App lost focus, stop rendering
            break;
    }
}

// Main entry point for Android applications
void android_main(struct android_app* app) {
    AppState appState = {};
    appState.running = true;

    app->userData = &appState;
    app->onAppCmd = handleCmd;
    app->onInputEvent = handleInput;

    // Main loop
    while (app->destroyRequested == 0 && appState.running) {
        // Process events
        int events;
        struct android_poll_source* source;

        while (ALooper_pollAll(0, nullptr, &events, (void**)&source) >= 0) {
            if (source != nullptr) {
                source->process(app, source);
            }
        }

        // Render with Vulkan (not shown)
    }

    // Cleanup
    if (appState.surface != VK_NULL_HANDLE) {
        vkDestroySurfaceKHR(appState.instance, appState.surface, nullptr);
    }
}

While Vulkan itself doesn’t provide audio capabilities, several libraries can be used alongside Vulkan for audio processing.

[OpenAL](https://www.openal.org/) is a cross-platform 3D audio API designed for efficient rendering of multichannel three-dimensional positional audio.

#include 
#include 
#include 
#include 

bool initOpenAL() {
    // Open the default device
    ALCdevice* device = alcOpenDevice(nullptr);
    if (!device) {
        std::cerr & audioData, ALsizei frequency) {
    // Generate buffer
    ALuint buffer;
    alGenBuffers(1, &buffer);

    // Fill buffer with audio data
    alBufferData(buffer, AL_FORMAT_MONO8, audioData.data(), audioData.size(), frequency);

    // Generate source
    ALuint source;
    alGenSources(1, &source);

    // Attach buffer to source
    alSourcei(source, AL_BUFFER, buffer);

    // Play source
    alSourcePlay(source);

    // Wait for sound to finish (in a real application, you'd handle this differently)
    ALint state;
    do {
        alGetSourcei(source, AL_SOURCE_STATE, &state);
    } while (state == AL_PLAYING);

    // Cleanup
    alDeleteSources(1, &source);
    alDeleteBuffers(1, &buffer);
}

[FMOD](https://www.fmod.com/) is a proprietary sound effects engine used in many games and applications.

#include 
#include 
#include 

void ERRCHECK(FMOD_RESULT result) {
    if (result != FMOD_OK) {
        std::cerr init(32, FMOD_INIT_NORMAL, nullptr));

    // Load sound
    ERRCHECK(system->createSound("sound.wav", FMOD_DEFAULT, nullptr, &sound));

    // Play sound
    ERRCHECK(system->playSound(sound, nullptr, false, &channel));

    // Main loop
    bool running = true;
    while (running) {
        // Update FMOD
        ERRCHECK(system->update());

        // Check if sound is still playing
        bool isPlaying = false;
        if (channel) {
            channel->isPlaying(&isPlaying);
            if (!isPlaying) {
                running = false;
            }
        }

        // Your Vulkan rendering code here
    }

    // Cleanup
    ERRCHECK(sound->release());
    ERRCHECK(system->close());
    ERRCHECK(system->release());

    return 0;
}

Mobile platforms have their own audio APIs optimized for mobile devices. These APIs provide features specifically designed for mobile environments, such as handling audio focus changes, managing battery usage, and dealing with interruptions.

Android provides AAudio and OpenSL ES (Deprecated) for high-performance audio
 in
gapplications like games.  With the goal of recommending one library to work
across 99% of devices, we recommend
the
Oboe library for
Android audio development.

[Oboe](https://github.com/google/oboe) is a C++ library developed by Google that provides a high-performance, low-latency audio API for Android. It’s the recommended library for audio in Android applications, especially for games and other applications requiring real-time audio.

Oboe provides a unified API that automatically selects the best available audio backend:

* 
On Android 8.0 (API 26) and higher, it uses AAudio

* 
On older Android versions, it falls back to OpenSL ES

This approach gives you the benefits of AAudio on newer devices while maintaining compatibility with older devices.

#include 
#include 
#include 

#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, "OboeAudioEngine", __VA_ARGS__)

class OboeAudioEngine : public oboe::AudioStreamCallback {
public:
    OboeAudioEngine() : stream_(nullptr), phase_(0.0f) {}
    ~OboeAudioEngine() { closeStream(); }

    bool setupAudioStream() {
        // Create an audio stream builder
        oboe::AudioStreamBuilder builder;

        // Configure the builder
        builder.setDirection(oboe::Direction::Output)
               ->setPerformanceMode(oboe::PerformanceMode::LowLatency)
               ->setSharingMode(oboe::SharingMode::Exclusive)
               ->setFormat(oboe::AudioFormat::Float)
               ->setChannelCount(oboe::ChannelCount::Stereo)
               ->setCallback(this);

        // Build the stream
        oboe::Result result = builder.openStream(stream_);
        if (result != oboe::Result::OK) {
            LOGE("Failed to create audio stream. Error: %s", oboe::convertToText(result));
            return false;
        }

        // Get the sample rate from the stream (in case the requested sample rate was not available)
        sampleRate_ = stream_->getSampleRate();

        return true;
    }

    bool startStream() {
        if (!stream_) {
            return false;
        }

        oboe::Result result = stream_->requestStart();
        if (result != oboe::Result::OK) {
            LOGE("Failed to start audio stream. Error: %s", oboe::convertToText(result));
            return false;
        }

        return true;
    }

    void stopStream() {
        if (stream_) {
            stream_->requestStop();
        }
    }

    void closeStream() {
        if (stream_) {
            stream_->close();
            stream_.reset();
        }
    }

    // AudioStreamCallback implementation
    oboe::DataCallbackResult onAudioReady(
            oboe::AudioStream *stream,
            void *audioData,
            int32_t numFrames) override {

        float *buffer = static_cast(audioData);

        // Generate audio data (simple sine wave example)
        for (int i = 0; i = 2.0f * M_PI) {
                phase_ -= 2.0f * M_PI;
            }
        }

        return oboe::DataCallbackResult::Continue;
    }

    // Error callback
    void onErrorBeforeClose(oboe::AudioStream *stream, oboe::Result error) override {
        LOGE("Oboe error before close: %s", oboe::convertToText(error));
    }

    void onErrorAfterClose(oboe::AudioStream *stream, oboe::Result error) override {
        LOGE("Oboe error after close: %s", oboe::convertToText(error));

        // Reopen the stream if it was disconnected (e.g., when headphones are unplugged)
        if (error == oboe::Result::ErrorDisconnected) {
            closeStream();
            setupAudioStream();
            startStream();
        }
    }

private:
    std::shared_ptr stream_;
    float phase_;
    int32_t sampleRate_;
};

// Usage in your Android application:
// OboeAudioEngine audioEngine;
// audioEngine.setupAudioStream();
// audioEngine.startStream();
//
// // When done:
// audioEngine.stopStream();
// audioEngine.closeStream();

Handling audio focus is crucial for a good user experience on Android:

// In your native code, you'll need to call Java methods via JNI
extern "C" {
    JNIEXPORT void JNICALL
    Java_com_example_vulkanaudio_AudioManager_nativeOnAudioFocusGained(JNIEnv *env, jobject thiz) {
        // Resume audio playback
        // For example:
        // audioEngine->start();
    }

    JNIEXPORT void JNICALL
    Java_com_example_vulkanaudio_AudioManager_nativeOnAudioFocusLost(JNIEnv *env, jobject thiz) {
        // Pause audio playback
        // For example:
        // audioEngine->stop();
    }
}

Java side:

public class AudioManager {
    private AudioManager.OnAudioFocusChangeListener afChangeListener = new AudioManager.OnAudioFocusChangeListener() {
        public void onAudioFocusChange(int focusChange) {
            if (focusChange == AudioManager.AUDIOFOCUS_LOSS) {
                // Lost focus for an unbounded amount of time
                nativeOnAudioFocusLost();
            } else if (focusChange == AudioManager.AUDIOFOCUS_LOSS_TRANSIENT) {
                // Lost focus for a short time
                nativeOnAudioFocusLost();
            } else if (focusChange == AudioManager.AUDIOFOCUS_GAIN) {
                // Gained focus
                nativeOnAudioFocusGained();
            }
        }
    };

    public void requestAudioFocus() {
        AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
        int result = audioManager.requestAudioFocus(afChangeListener,
                AudioManager.STREAM_MUSIC,
                AudioManager.AUDIOFOCUS_GAIN);

        if (result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
            // Start playback
            nativeOnAudioFocusGained();
        }
    }

    // Native methods
    private native void nativeOnAudioFocusGained();
    private native void nativeOnAudioFocusLost();
}

iOS provides several audio APIs, with AVAudioEngine being the recommended high-level API and Core Audio for low-level control.

[AVAudioEngine](https://developer.apple.com/documentation/avfaudio/avaudioengine) is the recommended high-level audio API for iOS applications.

// This is Objective-C++ code that would be used in your iOS application
#import 
#include 

class iOSAudioEngine {
public:
    iOSAudioEngine() : audioEngine(nil), playerNode(nil), isPlaying(false) {}

    bool initialize() {
        @autoreleasepool {
            // Create the audio engine
            audioEngine = [[AVAudioEngine alloc] init];
            if (!audioEngine) {
                NSLog(@"Failed to create AVAudioEngine");
                return false;
            }

            // Create a player node
            playerNode = [[AVAudioPlayerNode alloc] init];
            if (!playerNode) {
                NSLog(@"Failed to create AVAudioPlayerNode");
                return false;
            }

            // Attach the player node to the engine
            [audioEngine attachNode:playerNode];

            // Connect the player node to the output
            [audioEngine connect:playerNode to:audioEngine.mainMixerNode format:[audioEngine.mainMixerNode outputFormatForBus:0]];

            // Prepare the engine
            NSError* error = nil;
            if (![audioEngine startAndReturnError:&error]) {
                NSLog(@"Failed to start AVAudioEngine: %@", error);
                return false;
            }

            return true;
        }
    }

    bool playSound(const std::vector& audioData, int sampleRate, int channels) {
        @autoreleasepool {
            if (!audioEngine || !playerNode) {
                return false;
            }

            // Create an audio buffer
            AVAudioFormat* format = [[AVAudioFormat alloc] initStandardFormatWithSampleRate:sampleRate channels:channels];
            AVAudioPCMBuffer* buffer = [[AVAudioPCMBuffer alloc] initWithPCMFormat:format frameCapacity:audioData.size() / channels];

            // Fill the buffer with audio data
            float* bufferData = buffer.floatChannelData[0];
            for (int i = 0; i  audioData = createAudioData();
// audioEngine.playSound(audioData, 44100, 2);
//
// // When done:
// audioEngine.stop();
// audioEngine.shutdown();

[Core Audio](https://developer.apple.com/documentation/coreaudio) provides low-level audio capabilities for iOS applications.

// This is Objective-C++ code that would be used in your iOS application
#import 
#include 
#include 

class CoreAudioEngine {
public:
    CoreAudioEngine() : audioUnit(nullptr), isInitialized(false) {}

    bool initialize() {
        // Set up the audio component description
        AudioComponentDescription desc;
        desc.componentType = kAudioUnitType_Output;
        desc.componentSubType = kAudioUnitSubType_RemoteIO;
        desc.componentManufacturer = kAudioUnitManufacturer_Apple;
        desc.componentFlags = 0;
        desc.componentFlagsMask = 0;

        // Find the audio component
        AudioComponent component = AudioComponentFindNext(NULL, &desc);
        if (!component) {
            NSLog(@"Failed to find audio component");
            return false;
        }

        // Create the audio unit
        OSStatus status = AudioComponentInstanceNew(component, &audioUnit);
        if (status != noErr) {
            NSLog(@"Failed to create audio unit: %d", (int)status);
            return false;
        }

        // Enable output
        UInt32 enableOutput = 1;
        status = AudioUnitSetProperty(audioUnit,
                                     kAudioOutputUnitProperty_EnableIO,
                                     kAudioUnitScope_Output,
                                     0,
                                     &enableOutput,
                                     sizeof(enableOutput));
        if (status != noErr) {
            NSLog(@"Failed to enable audio output: %d", (int)status);
            return false;
        }

        // Set up the audio format
        AudioStreamBasicDescription audioFormat;
        audioFormat.mSampleRate = 44100;
        audioFormat.mFormatID = kAudioFormatLinearPCM;
        audioFormat.mFormatFlags = kAudioFormatFlagIsFloat | kAudioFormatFlagIsPacked | kAudioFormatFlagIsNonInterleaved;
        audioFormat.mBytesPerPacket = 4;
        audioFormat.mFramesPerPacket = 1;
        audioFormat.mBytesPerFrame = 4;
        audioFormat.mChannelsPerFrame = 2;
        audioFormat.mBitsPerChannel = 32;

        status = AudioUnitSetProperty(audioUnit,
                                     kAudioUnitProperty_StreamFormat,
                                     kAudioUnitScope_Input,
                                     0,
                                     &audioFormat,
                                     sizeof(audioFormat));
        if (status != noErr) {
            NSLog(@"Failed to set audio format: %d", (int)status);
            return false;
        }

        // Set up the render callback
        AURenderCallbackStruct callbackStruct;
        callbackStruct.inputProc = renderCallback;
        callbackStruct.inputProcRefCon = this;

        status = AudioUnitSetProperty(audioUnit,
                                     kAudioUnitProperty_SetRenderCallback,
                                     kAudioUnitScope_Input,
                                     0,
                                     &callbackStruct,
                                     sizeof(callbackStruct));
        if (status != noErr) {
            NSLog(@"Failed to set render callback: %d", (int)status);
            return false;
        }

        // Initialize the audio unit
        status = AudioUnitInitialize(audioUnit);
        if (status != noErr) {
            NSLog(@"Failed to initialize audio unit: %d", (int)status);
            return false;
        }

        isInitialized = true;
        return true;
    }

    bool start() {
        if (!isInitialized) {
            return false;
        }

        OSStatus status = AudioOutputUnitStart(audioUnit);
        if (status != noErr) {
            NSLog(@"Failed to start audio unit: %d", (int)status);
            return false;
        }

        return true;
    }

    void stop() {
        if (isInitialized) {
            AudioOutputUnitStop(audioUnit);
        }
    }

    void shutdown() {
        if (isInitialized) {
            stop();
            AudioUnitUninitialize(audioUnit);
            AudioComponentInstanceDispose(audioUnit);
            audioUnit = nullptr;
            isInitialized = false;
        }
    }

private:
    AudioUnit audioUnit;
    bool isInitialized;
    float phase = 0.0f;

    // Audio render callback
    static OSStatus renderCallback(void* inRefCon,
                                  AudioUnitRenderActionFlags* ioActionFlags,
                                  const AudioTimeStamp* inTimeStamp,
                                  UInt32 inBusNumber,
                                  UInt32 inNumberFrames,
                                  AudioBufferList* ioData) {
        CoreAudioEngine* engine = static_cast(inRefCon);
        return engine->render(ioActionFlags, inTimeStamp, inBusNumber, inNumberFrames, ioData);
    }

    OSStatus render(AudioUnitRenderActionFlags* ioActionFlags,
                   const AudioTimeStamp* inTimeStamp,
                   UInt32 inBusNumber,
                   UInt32 inNumberFrames,
                   AudioBufferList* ioData) {
        // Generate audio data
        // For example, generate a sine wave
        for (UInt32 i = 0; i mNumberBuffers; i++) {
            float* buffer = static_cast(ioData->mBuffers[i].mData);

            for (UInt32 frame = 0; frame  2.0f * M_PI) {
                    phase -= 2.0f * M_PI;
                }
            }
        }

        return noErr;
    }
};

// Usage:
// CoreAudioEngine audioEngine;
// audioEngine.initialize();
// audioEngine.start();
//
// // When done:
// audioEngine.stop();
// audioEngine.shutdown();

Managing the audio session is important for proper audio behavior on iOS:

// This is Objective-C++ code that would be used in your iOS application
#import 

class AudioSessionManager {
public:
    bool configureAudioSession() {
        @autoreleasepool {
            NSError* error = nil;

            // Get the shared audio session
            AVAudioSession* session = [AVAudioSession sharedInstance];

            // Set the category
            if (![session setCategory:AVAudioSessionCategoryAmbient
                          withOptions:0
                                error:&error]) {
                NSLog(@"Failed to set audio session category: %@", error);
                return false;
            }

            // Set the mode
            if (![session setMode:AVAudioSessionModeDefault error:&error]) {
                NSLog(@"Failed to set audio session mode: %@", error);
                return false;
            }

            // Activate the audio session
            if (![session setActive:YES error:&error]) {
                NSLog(@"Failed to activate audio session: %@", error);
                return false;
            }

            // Register for interruptions
            [[NSNotificationCenter defaultCenter] addObserver:[NSObject new]
                                                     selector:@selector(handleInterruption:)
                                                         name:AVAudioSessionInterruptionNotification
                                                       object:nil];

            return true;
        }
    }

    void handleInterruption(NSNotification* notification) {
        @autoreleasepool {
            NSDictionary* info = notification.userInfo;
            NSInteger type = [[info valueForKey:AVAudioSessionInterruptionTypeKey] integerValue];

            if (type == AVAudioSessionInterruptionTypeBegan) {
                // Audio session interrupted - pause audio
                NSLog(@"Audio session interrupted");
                // audioEngine->stop();
            } else if (type == AVAudioSessionInterruptionTypeEnded) {
                NSInteger options = [[info valueForKey:AVAudioSessionInterruptionOptionKey] integerValue];
                if (options == AVAudioSessionInterruptionOptionShouldResume) {
                    // Interruption ended - resume audio
                    NSLog(@"Audio session interruption ended");
                    // audioEngine->start();
                }
            }
        }
    }
};

// Usage:
// AudioSessionManager sessionManager;
// sessionManager.configureAudioSession();

When developing audio for mobile platforms, consider the following:

Audio processing can be CPU-intensive and drain the battery. Consider these strategies:

**Reduce Sample Rate**: Use lower sample rates when high fidelity isn’t required.

**Process in Larger Chunks**: Process audio in larger buffer sizes to reduce CPU wake-ups.

**Pause Audio**: Pause audio processing when the app is in the background or when audio isn’t needed.

Mobile devices have limited memory:

**Stream Audio**: Stream large audio files rather than loading them entirely into memory.

**Unload Unused Assets**: Unload audio assets when they’re not needed.

**Compress Audio**: Use appropriate compression formats for mobile (AAC for iOS, Opus for Android).

Handle audio interruptions gracefully:

**Save State**: When interrupted, save the audio state so it can be resumed later.

**Respect System Volume**: Use the system volume controls rather than implementing your own.

**Handle Phone Calls**: Pause audio during phone calls and other system interruptions.

Different devices have different audio latency characteristics:

**Test on Real Devices**: Simulator audio behavior may differ from real devices.

**Use Low-Latency Modes**: Both Android and iOS provide low-latency audio modes for real-time applications.

**Buffer Appropriately**: Balance between latency and audio stability with appropriate buffer sizes.

When using these windowing and input libraries with Vulkan, there are a few key considerations:

Each windowing library provides a way to create a `VkSurfaceKHR` object, which is the bridge between Vulkan and the window system:

* 
GLFW: `glfwCreateWindowSurface`

* 
SDL2: `SDL_Vulkan_CreateSurface`

* 
Win32: `vkCreateWin32SurfaceKHR`

* 
XCB: `vkCreateXcbSurfaceKHR`

* 
Wayland: `vkCreateWaylandSurfaceKHR`

* 
macOS: `vkCreateMacOSSurfaceMVK`

* 
iOS: `vkCreateIOSSurfaceMVK`

* 
Android: `vkCreateAndroidSurfaceKHR`

* 
Metal: `vkCreateMetalSurfaceEXT`

The swapchain needs to be recreated when the window is resized. Here’s a basic approach:

void handleWindowResize(VkDevice device, VkSwapchainKHR& swapchain, VkSurfaceKHR surface) {
    // Wait for device to be idle
    vkDeviceWaitIdle(device);

    // Destroy old swapchain
    VkSwapchainKHR oldSwapchain = swapchain;

    // Get new surface capabilities
    VkSurfaceCapabilitiesKHR capabilities;
    vkGetPhysicalDeviceSurfaceCapabilitiesKHR(physicalDevice, surface, &capabilities);

    // Create new swapchain
    VkSwapchainCreateInfoKHR createInfo = {};
    createInfo.sType = VK_STRUCTURE_TYPE_SWAPCHAIN_CREATE_INFO_KHR;
    createInfo.surface = surface;
    createInfo.minImageCount = capabilities.minImageCount + 1;
    createInfo.imageFormat = surfaceFormat.format;
    createInfo.imageColorSpace = surfaceFormat.colorSpace;
    createInfo.imageExtent = capabilities.currentExtent;
    createInfo.imageArrayLayers = 1;
    createInfo.imageUsage = VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT;
    createInfo.imageSharingMode = VK_SHARING_MODE_EXCLUSIVE;
    createInfo.preTransform = capabilities.currentTransform;
    createInfo.compositeAlpha = VK_COMPOSITE_ALPHA_OPAQUE_BIT_KHR;
    createInfo.presentMode = presentMode;
    createInfo.clipped = VK_TRUE;
    createInfo.oldSwapchain = oldSwapchain;

    VkResult result = vkCreateSwapchainKHR(device, &createInfo, nullptr, &swapchain);
    if (result != VK_SUCCESS) {
        throw std::runtime_error("Failed to create swapchain");
    }

    // Destroy old swapchain if it was replaced
    if (oldSwapchain != VK_NULL_HANDLE) {
        vkDestroySwapchainKHR(device, oldSwapchain, nullptr);
    }

    // Recreate swapchain images, image views, framebuffers, etc.
    // ...
}

Input handling typically affects the application state, which then influences the Vulkan rendering:

struct AppState {
    float cameraPosition[3] = {0.0f, 0.0f, 0.0f};
    float cameraRotation[3] = {0.0f, 0.0f, 0.0f};
    // Other state variables
};

// Update state based on input
void handleInput(AppState& state, float deltaTime) {
    // Example with GLFW
    if (glfwGetKey(window, GLFW_KEY_W) == GLFW_PRESS) {
        state.cameraPosition[2] -= 1.0f * deltaTime;
    }
    if (glfwGetKey(window, GLFW_KEY_S) == GLFW_PRESS) {
        state.cameraPosition[2] += 1.0f * deltaTime;
    }
    // Handle other keys and input
}

// In main loop
AppState state;
float lastFrameTime = 0.0f;

while (!glfwWindowShouldClose(window)) {
    float currentTime = glfwGetTime();
    float deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    glfwPollEvents();
    handleInput(state, deltaTime);

    // Update uniform buffers with new state
    updateUniformBuffers(state);

    // Render frame with Vulkan
    drawFrame();
}

**Minimize Window Resizing**: Recreating the swapchain is expensive, so handle window resizing efficiently.

**Batch Input Processing**: Process all input events at once rather than handling them individually.

**Use Double Buffering**: For audio, use double buffering to ensure smooth playback while preparing the next audio segment.

**Abstract Platform-Specific Code**: Create a platform abstraction layer to handle differences between platforms.

**Use Cross-Platform Libraries**: Libraries like GLFW and SDL2 already handle most platform-specific details.

**Test on All Target Platforms**: Different platforms may have subtle differences in behavior.

Always check return values and handle errors gracefully:

VkResult result = vkCreateSwapchainKHR(device, &createInfo, nullptr, &swapchain);
if (result != VK_SUCCESS) {
    switch (result) {
        case VK_ERROR_OUT_OF_HOST_MEMORY:
            std::cerr 

* 
[GLFW](https://www.glfw.org/)

* 
[SDL2](https://www.libsdl.org/)

* 
[OpenAL](https://www.openal.org/)

* 
[FMOD](https://www.fmod.com/)

* 
[Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples)

* 
[Sascha Willems' Vulkan Examples](https://github.com/SaschaWillems/Vulkan)

* 
[Vulkan Tutorial](https://docs.vulkan.org/tutorial/latest/00_Introduction.html)

* 
[GLFW Documentation](https://www.glfw.org/docs/latest/)

* 
[SDL2 Wiki](https://wiki.libsdl.org/SDL2/FrontPage)

* 
[OpenAL Documentation](https://www.openal.org/documentation/)

* 
[FMOD Documentation](https://www.fmod.com/resources/documentation-api)

* 
[Oboe GitHub Repository](https://github.com/google/oboe)

* 
[Oboe Documentation](https://github.com/google/oboe/wiki)

* 
[iOS AVAudioEngine Documentation](https://developer.apple.com/documentation/avfaudio/avaudioengine)

* 
[iOS Core Audio Documentation](https://developer.apple.com/documentation/coreaudio)
