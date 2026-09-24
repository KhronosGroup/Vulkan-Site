# Vulkan Portability Extension

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/portability/README.html

## Table of Contents

- [Overview](#_overview)
- [Setup](#_setup)
- [Asking the device for the list of supported features](#_asking_the_device_for_the_list_of_supported_features)
- [Asking_the_device_for_the_list_of_supported_features](#_asking_the_device_for_the_list_of_supported_features)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/portability). |
| --- | --- |

This tutorial, along with the accompanying example code, demonstrates the use of the [VK_KHR_portability_subset](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#VK_KHR_portability_subset) extension.
When the VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR is set in the `Instance` class, Vulkan will consider  devices that aren’t fully conformant such as [MoltenVk](https://github.com/KhronosGroup/MoltenVK) to be identified  as a conformant implementation.
When this happens, use the VkPhysicalDevicePortabilitySubsetPropertiesKHR extension  with the [vkGetPhysicalDeviceFeatures2](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#vkGetPhysicalDeviceFeatures2) as detailed below to get the list of supported/unsupported features.

This tutorial along with the accompanying code also demonstrates the use of the [VkPhysicalDevicePortabilitySubsetPropertiesKHR](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#VkPhysicalDevicePortabilitySubsetPropertiesKHR) which is currently a beta khronos extension.
This extension  provides a list of supported and unsupported parts of Vulkan on a non-conformant Vulkan instance.
Build with  VK_ENABLE_BETA_EXTENSIONS set to enable this.

|  | Enabling the extension globally is done inside the framework, see the `Instance` class in [instance.
| --- | --- |
cpp](../../../framework/core/instance.cpp) for details.
To enable the extension for all samples, build with  VKB_ENABLE_PORTABILITY defined. |

Enabling the functionality for the portability subset is done by adding the extension to the list of extensions to  enable at instance level.
The device instance can also be used to generate the subset of portability enabled device  items.
As with all extensions, this is optional, and you should check if the extension is present before enabling it.

uint32_t instance_extension_count;
VK_CHECK(vkEnumerateInstanceExtensionProperties(nullptr, &instance_extension_count, nullptr));

std::vector available_instance_extensions(instance_extension_count);
VK_CHECK(vkEnumerateInstanceExtensionProperties(nullptr, &instance_extension_count, available_instance_extensions.data()));

bool debug_utils = false;
for (auto &available_extension : available_instance_extensions)
{
    if (strcmp(available_extension.extensionName, VK_KHR_PORTABILITY_SUBSET_EXTENSION_NAME) == 0)
    {
        debug_utils = true;
        extensions.push_back(VK_KHR_PORTABILITY_SUBSET_EXTENSION_NAME);
    }
}

NB: VkPhysicalDevicePortabilitySubsetFeaturesKHR is currently a beta extension and will only compile with the  VK_ENABLE_BETA_EXTENSIONS definition set.

VkPhysicalDevicePortabilitySubsetFeaturesKHR portability_features{};
portability_features.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PORTABILITY_SUBSET_FEATURES_KHR;

We then pass this to the `pNext` member of our Physical Device Features creation structure, then call the  vkGetPhysicalDeviceFeatures2 function, the structure will populate and can be queried:

VkPhysicalDeviceFeatures2 device_features{};
device_features.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2;
device_features.pNext = &portability_features;
vkGetPhysicalDeviceFeatures2(get_device().get_gpu().get_handle(), &device_features);
