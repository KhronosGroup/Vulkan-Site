# VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT - Structure describing whether multisampled rendering to single-sampled attachments is supported on swapchain images

The `VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT` structure
is defined as:

// Provided by VK_EXT_multisampled_render_to_swapchain
typedef struct VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           multisampledRenderToSwapchain;
} VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`multisampledRenderToSwapchain` indicates that the implementation
supports multisampled rendering to single-sampled render pass
attachments referencing swapchain images.

If the `VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTISAMPLED_RENDER_TO_SWAPCHAIN_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_multisampled_render_to_swapchain](VK_EXT_multisampled_render_to_swapchain.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
