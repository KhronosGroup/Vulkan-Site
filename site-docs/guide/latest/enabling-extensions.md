# Enabling Extensions

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/enabling_extensions.html

## Table of Contents

- [Two types of extensions](#_two_types_of_extensions)
- [Two_types_of_extensions](#_two_types_of_extensions)
- [Check for support](#_check_for_support)
- [Check_for_support](#_check_for_support)
- [Enable the Extension](#_enable_the_extension)
- [Enable_the_Extension](#_enable_the_extension)
- [Check for feature bits](#_check_for_feature_bits)
- [Check_for_feature_bits](#_check_for_feature_bits)
- [Promotion Process](#_promotion_process)
- [Promotion Change of Behavior](#_promotion_change_of_behavior)
- [Promotion_Change_of_Behavior](#_promotion_change_of_behavior)

## Content

This section goes over the logistics for enabling extensions.

There are two groups of extensions, **instance extensions** and **device extensions**. Simply put, **instance extensions** are tied to the entire `VkInstance` while **device extensions** are tied to only a single `VkDevice` object.

This information is documented under the “Extension Type” section of each extension reference page. Example below:

![enabling_extensions_instance_extension.png](_images/enabling_extensions_instance_extension.png)

An application can [query the physical device](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-extensions) first to check if the extension is **supported** with `vkEnumerateInstanceExtensionProperties` or `vkEnumerateDeviceExtensionProperties`.

// Simple example
uint32_t count = 0;
vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &count, nullptr);
std::vector extensions(count);
vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &count, extensions.data());

// Checking for support of VK_KHR_bind_memory2
for (uint32_t i = 0; i 

Even if the extension is **supported** by the implementation, it is **undefined behavior** to use the functionality of the extension unless it is **enabled** at `VkInstance` or `VkDevice` creation time.

Here is an example of what is needed to enable an extension such as `VK_KHR_driver_properties`.

![enabling_extensions_driver_properties.png](_images/enabling_extensions_driver_properties.png)

// VK_KHR_get_physical_device_properties2 is required to use VK_KHR_driver_properties
// since it's an instance extension it needs to be enabled before at VkInstance creation time
std::vector instance_extensions;
instance_extensions.push_back(VK_KHR_GET_PHYSICAL_DEVICE_PROPERTIES_2_EXTENSION_NAME);

VkInstanceCreateInfo instance_create_info  = {};
instance_create_info.enabledExtensionCount   = static_cast(instance_extensions.size());
instance_create_info.ppEnabledExtensionNames = instance_extensions.data();
vkCreateInstance(&instance_create_info, nullptr, &myInstance);

// ...

std::vector device_extensions;
device_extensions.push_back(VK_KHR_DRIVER_PROPERTIES_EXTENSION_NAME);

VkDeviceCreateInfo device_create_info      = {};
device_create_info.enabledExtensionCount   = static_cast(device_extensions.size());
device_create_info.ppEnabledExtensionNames = device_extensions.data();
vkCreateDevice(physicalDevice, &device_create_info, nullptr, &myDevice);

It is important to remember that extensions add the existence of functionality to the Vulkan spec, but this doesn’t mean that all features of an extension are available if the extension is **supported**. An example is an extension such as `VK_KHR_8bit_storage`, which has 3 features it exposes in `VkPhysicalDevice8BitStorageFeatures`.

![enabling_extensions_8bit.png](_images/enabling_extensions_8bit.png)

This means after enabling the extension, an application will still need to [query and enable the features](enabling_features.html#enabling-features) needed from an extension.

When minor versions of [Vulkan are released](vulkan_release_summary.html#vulkan-release-summary), some extensions are [promoted as defined in the spec](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-compatibility-promotion). The goal of promotion is to have extended functionality, that the Vulkan Working Group has decided is widely supported, to be in the core Vulkan spec. More details about Vulkan versions can be found in the [version chapter](versions.html#versions).

An example would be something such as `VK_KHR_get_physical_device_properties2` which is used for most other extensions. In Vulkan 1.0, an application has to query for support of `VK_KHR_get_physical_device_properties2` before being able to call a function such as `vkGetPhysicalDeviceFeatures2KHR`. Starting in Vulkan 1.1, the `vkGetPhysicalDeviceFeatures2` function is guaranteed to be supported.

Another way to look at promotion is with the `VK_KHR_8bit_storage` as an example again. Since Vulkan 1.0 some features, such as `textureCompressionASTC_LDR`, are not required to be supported, but are available to query without needing to enable any extensions. Starting in Vulkan 1.2 when `VK_KHR_8bit_storage` was promoted to core, all the features in `VkPhysicalDevice8BitStorageFeatures` can now be found in `VkPhysicalDeviceVulkan12Features`.

It is important to realize there is a subtle difference for **some** extension that are promoted. [The spec describes](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-compatibility-promotion) how promotion **can** involve minor changes such as in the extension’s “Feature advertisement/enablement”. To best describe the subtlety of this, `VK_KHR_8bit_storage` can be used as a use case.

The [Vulkan spec describes the change](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_8bit_storage.html#_promotion_to_vulkan_1_2) for `VK_KHR_8bit_storage` for Vulkan 1.2 where it states:

> 

If the VK_KHR_8bit_storage extension is not supported, support for the SPIR-V StorageBuffer8BitAccess capability in shader modules is optional.

"not supported" here refers to the fact that an implementation might support Vulkan 1.2+, but if an application queries `vkEnumerateDeviceExtensionProperties` it is possible that `VK_KHR_8bit_storage` will not be in the result.

* 
If `VK_KHR_8bit_storage` is found in `vkEnumerateDeviceExtensionProperties` then the `storageBuffer8BitAccess` feature is **guaranteed** to be supported.

* 
If `VK_KHR_8bit_storage` is **not** found in `vkEnumerateDeviceExtensionProperties` then the `storageBuffer8BitAccess` feature **might** be supported and can be checked by querying `VkPhysicalDeviceVulkan12Features::storageBuffer8BitAccess`.

The list of all feature changes to promoted extensions can be found in the [version appendix of the spec](https://docs.vulkan.org/spec/latest/appendices/versions.html).
