# VK_EXT_layer_settings — Configure validation layers programmatically

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/layer_settings/README.html

## Table of Contents

- [Why use layer settings?](#_why_use_layer_settings)
- [Why_use_layer_settings?](#_why_use_layer_settings)
- [What this sample does](#_what_this_sample_does)
- [What_this_sample_does](#_what_this_sample_does)
- [How to use this sample](#_how_to_use_this_sample)
- [How_to_use_this_sample](#_how_to_use_this_sample)
- [What each scenario teaches](#_what_each_scenario_teaches)
- [What_each_scenario_teaches](#_what_each_scenario_teaches)
- [When to use it vs. alternatives](#_when_to_use_it_vs_alternatives)
- [When_to_use_it_vs._alternatives](#_when_to_use_it_vs_alternatives)
- [Using VK_EXT_layer_settings](#_using_vk_ext_layer_settings)
- [Using_VK_EXT_layer_settings](#_using_vk_ext_layer_settings)
- [Minimal C/C++ example (C API shown)](#_minimal_cc_example_c_api_shown)
- [Minimal_C/C++_example_(C_API_shown)](#_minimal_cc_example_c_api_shown)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/layer_settings). |
| --- | --- |

This sample demonstrates how to use VK_EXT_layer_settings to configure Vulkan layers (in particular `VK_LAYER_KHRONOS_validation`) directly from your application. Instead of relying on environment variables or JSON files, you can enable features like Best Practices and `debugPrintfEXT`, tune message filtering, or change output settings via code.

Note: This sample works properly in debug mode and should be viewed in that build configuration.

* 
Portability and reproducibility: ship settings with the app, not the environment.

* 
Fine-grained control: enable/disable individual validation features and categories.

* 
Better UX for samples and tools: turn on useful validation features without asking users to edit configs.

VK_EXT_layer_settings supersedes the older `VK_EXT_validation_features` and `VK_EXT_validation_flags` by offering a general, extensible way to pass settings to any Vulkan layer (not just validation).

* 
Enables the instance extension `VK_EXT_layer_settings` (optionally).

* 
Adds settings for the Khronos validation layer before the Vulkan instance is created:

Enables Best Practices checks.

* 
Enables `debugPrintfEXT` support (so shader `debugPrintf` messages are emitted via validation).

Provides an interactive UI with toggleable validation scenarios that demonstrate common mistakes:

* 
**Wrong Buffer Flags**: Creates a buffer with `TRANSFER_DST` usage but binds it as a vertex buffer (missing `VERTEX_BUFFER_BIT`).

* 
**Suboptimal Transitions**: Performs image layout transitions to `GENERAL` instead of more optimal layouts like `COLOR_ATTACHMENT_OPTIMAL`.

* 
**Many Small Allocations**: Creates numerous small memory allocations (512 bytes each) instead of suballocating from larger blocks.

Displays validation messages in real-time within the application UI, showing warning counts per scenario and total statistics.

Works on all platforms without requiring terminal access to see validation output.

When you run the sample, you’ll see an interactive UI with checkboxes for each validation scenario:

**Enable scenarios individually**: Check the boxes to activate specific Best Practices violations.

**Observe validation messages**: Watch the "Recent Validation Messages" section populate with warnings as scenarios trigger.

**Review statistics**: See warning counts per scenario and total counts at the bottom.

**Learn from mistakes**: Each scenario demonstrates a real-world mistake that Best Practices validation catches.

**Wrong Buffer Flags**

Demonstrates the importance of declaring correct usage flags at buffer creation time. Using a buffer without the appropriate usage bit (e.g., `VERTEX_BUFFER_BIT`) can lead to undefined behavior or performance issues on some implementations.

**Suboptimal Transitions**

Shows why choosing the right image layout matters. Transitioning to `GENERAL` layout is legal but potentially suboptimal—specific layouts like `COLOR_ATTACHMENT_OPTIMAL` or `SHADER_READ_ONLY_OPTIMAL` enable better performance.

**Many Small Allocations**

Demonstrates why suballocation is important. Creating hundreds of tiny memory allocations wastes resources and can hit driver limits. Use a memory allocator library (like VMA) or implement suballocation.

* 
Prefer VK_EXT_layer_settings whenever you need to configure validation from within your app (development builds, samples, tools).

* 
`VK_EXT_validation_features` and `VK_EXT_validation_flags` are deprecated by layer settings; use those only for legacy purposes.

If you are integrating layer settings directly into your own Vulkan app, the flow is simple:

Enable validation layers (e.g., "VK_LAYER_KHRONOS_validation").

Check that the validation layer advertises the instance extension VK_EXT_layer_settings.

If available, add VK_EXT_layer_settings to your instance extension list.

Create one or more VkLayerSettingEXT entries (for example, to enable Best Practices and debugPrintfEXT).

Chain a VkLayerSettingsCreateInfoEXT with those settings into VkInstanceCreateInfo::pNext.

Call vkCreateInstance as usual. The layer consumes the settings at instance creation time.

Optional: Create a VkDebugUtilsMessengerEXT so you can see validation output.

#include 
#include 
#include 
#include 

static const char *kValidationLayerName = "VK_LAYER_KHRONOS_validation";

// Helper to check if VK_EXT_layer_settings is advertised by the validation layer
bool layer_settings_supported()
{
    uint32_t count = 0;
    vkEnumerateInstanceExtensionProperties(kValidationLayerName, &count, nullptr);
    std::vector exts(count);
    vkEnumerateInstanceExtensionProperties(kValidationLayerName, &count, exts.data());
    return std::ranges::find_if(exts, [](auto const &e) {
               return std::strcmp(e.extensionName, VK_EXT_LAYER_SETTINGS_EXTENSION_NAME) == 0;
           }) != exts.end();
}

// Helper to check if VK_EXT_validation_features is advertised by the validation layer
bool validation_features_supported()
{
    uint32_t count = 0;
    vkEnumerateInstanceExtensionProperties(kValidationLayerName, &count, nullptr);
    std::vector exts(count);
    vkEnumerateInstanceExtensionProperties(kValidationLayerName, &count, exts.data());
    return std::ranges::find_if(exts, [](auto const &e) {
               return std::strcmp(e.extensionName, VK_EXT_VALIDATION_FEATURES_EXTENSION_NAME) == 0;
           }) != exts.end();
}

VkInstance create_instance_with_layer_settings()
{
    std::vector instance_exts;
    instance_exts.push_back(VK_KHR_SURFACE_EXTENSION_NAME);
    // Add your platform surface extension(s), e.g. VK_KHR_xcb_surface, VK_KHR_win32_surface, etc.

    const char *layers[] = {kValidationLayerName};

    // Prepare layer settings (strings) we want to enable
    static const char *enables[] = {
        "VK_VALIDATION_FEATURE_ENABLE_BEST_PRACTICES_EXT",
        "VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT",
    };

    // One setting object that enables both features above
    VkLayerSettingEXT setting{};
    setting.pLayerName   = kValidationLayerName;
    setting.pSettingName = "enables";                         // well-known name used by VVL
    setting.type         = VK_LAYER_SETTING_TYPE_STRING_EXT;   // string list
    setting.valueCount   = static_cast(std::size(enables));
    setting.pValues      = enables;                            // const char* array

    VkLayerSettingsCreateInfoEXT layer_settings_ci{VK_STRUCTURE_TYPE_LAYER_SETTINGS_CREATE_INFO_EXT};
    layer_settings_ci.settingCount = 1;
    layer_settings_ci.pSettings    = &setting;

    // Build instance create info and chain layer settings if supported
    VkInstanceCreateInfo ici{VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO};
    ici.ppEnabledLayerNames   = layers;
    ici.enabledLayerCount     = 1;
    ici.ppEnabledExtensionNames = instance_exts.data();
    ici.enabledExtensionCount   = static_cast(instance_exts.size());

    const bool has_layer_settings      = layer_settings_supported();
    const bool has_validation_features = validation_features_supported();
    if (has_layer_settings)
    {
        // You also need to add VK_EXT_layer_settings to the enabled instance extensions
        instance_exts.push_back(VK_EXT_LAYER_SETTINGS_EXTENSION_NAME);
        ici.ppEnabledExtensionNames = instance_exts.data();
        ici.enabledExtensionCount   = static_cast(instance_exts.size());
        ici.pNext                   = &layer_settings_ci;
    }
    else if (has_validation_features)
    {
        // Fallback for older SDKs: use VK_EXT_validation_features
        static const VkValidationFeatureEnableEXT vfe[] = {
            VK_VALIDATION_FEATURE_ENABLE_BEST_PRACTICES_EXT,
            VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT,
        };
        static VkValidationFeaturesEXT validation_features{VK_STRUCTURE_TYPE_VALIDATION_FEATURES_EXT};
        validation_features.enabledValidationFeatureCount = static_cast(std::size(vfe));
        validation_features.pEnabledValidationFeatures    = vfe;
        ici.pNext = &validation_features;   // no VK_EXT_layer_settings needed for this path
    }

    VkInstance instance = VK_NULL_HANDLE;
    VkResult   result   = vkCreateInstance(&ici, nullptr, &instance);
    if (result != VK_SUCCESS)
    {
        // Handle error (missing extensions/layers, etc.)
        return VK_NULL_HANDLE;
    }

    return instance;
}

|  | debugPrintfEXT only produces messages when your shaders call debugPrintf. See the shader_debugprintf sample for a complete pipeline + shader example that emits messages through validation. |
| --- | --- |

|  | VK_EXT_layer_settings is an instance extension provided by the layer. On some systems it may not be present; the fallback above using VK_EXT_validation_features enables the same categories in a more limited, legacy way. |
| --- | --- |

|  | Layer settings only affect layers that recognize them. Enabling layer settings without enabling the corresponding layer (e.g., VK_LAYER_KHRONOS_validation) has no effect. |
| --- | --- |
