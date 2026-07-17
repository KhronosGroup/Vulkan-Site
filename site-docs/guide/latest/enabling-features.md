# Enabling Features

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/enabling_features.html

## Table of Contents

- [Category of Features](#_category_of_features)
- [Category_of_Features](#_category_of_features)
- [How to Enable the Features](#_how_to_enable_the_features)
- [How_to_Enable_the_Features](#_how_to_enable_the_features)

## Content

This section goes over the logistics for enabling features.

All features in Vulkan can be categorized/found in 3 sections

Core 1.0 Features

* 
These are the set of features that were available from the initial 1.0 release of Vulkan. The list of features can be found in [VkPhysicalDeviceFeatures](https://docs.vulkan.org/spec/latest/chapters/features.html#VkPhysicalDeviceFeatures)

Future Core Version Features

* 
With Vulkan 1.1+ some new features were added to the core version of Vulkan. To keep the size of `VkPhysicalDeviceFeatures` backward compatible, new structs were created to hold the grouping of features.

* 
[VkPhysicalDeviceVulkan11Features](https://docs.vulkan.org/spec/latest/chapters/features.html#VkPhysicalDeviceVulkan11Features)

* 
[VkPhysicalDeviceVulkan12Features](https://docs.vulkan.org/spec/latest/chapters/features.html#VkPhysicalDeviceVulkan12Features)

Extension Features

* 
Sometimes extensions contain features in order to enable certain aspects of the extension. These are easily found as they are all labeled as `VkPhysicalDevice[ExtensionName]Features`

All features must be enabled at `VkDevice` creation time inside the [VkDeviceCreateInfo](https://docs.vulkan.org/spec/latest/chapters/devsandqueues.html#VkDeviceCreateInfo) struct.

|  | Don’t forget to query first with `vkGetPhysicalDeviceFeatures` or `vkGetPhysicalDeviceFeatures2` |
| --- | --- |

For the Core 1.0 Features, this is as simple as setting `VkDeviceCreateInfo::pEnabledFeatures` with the features desired to be turned on.

VkPhysicalDeviceFeatures features = {};
vkGetPhysicalDeviceFeatures(physical_device, &features);

// Logic if feature is not supported
if (features.robustBufferAccess == VK_FALSE) {
}

VkDeviceCreateInfo info = {};
info.pEnabledFeatures = &features;

For **all features**, including the Core 1.0 Features, use `VkPhysicalDeviceFeatures2` to pass into `VkDeviceCreateInfo.pNext`

VkPhysicalDeviceShaderDrawParametersFeatures ext_feature = {};
ext_feature.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DRAW_PARAMETERS_FEATURES;

VkPhysicalDeviceFeatures2 physical_features2 = {};
physical_features2.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2;
physical_features2.pNext = &ext_feature;

vkGetPhysicalDeviceFeatures2(physical_device, &physical_features2);

// Logic if feature is not supported
if (ext_feature.shaderDrawParameters == VK_FALSE) {
}

VkDeviceCreateInfo info = {};
info.pNext = &physical_features2;

The same works for the “Future Core Version Features” too.

VkPhysicalDeviceVulkan11Features features11 = {};
features11.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_FEATURES;

VkPhysicalDeviceFeatures2 physical_features2 = {};
physical_features2.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2;
physical_features2.pNext = &features11;

vkGetPhysicalDeviceFeatures2(physical_device, &physical_features2);

// Logic if feature is not supported
if (features11.shaderDrawParameters == VK_FALSE) {
}

VkDeviceCreateInfo info = {};
info.pNext = &physical_features2;
