# VK_EXT_multisampled_render_to_swapchain(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_multisampled_render_to_swapchain.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_multisampled_render_to_swapchain](#VK_EXT_multisampled_render_to_swapchain)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_multisampled_render_to_swapchain - device extension

**Name String**

`VK_EXT_multisampled_render_to_swapchain`

**Extension Type**

Device extension

**Registered Extension Number**

617

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

[VK_EXT_multisampled_render_to_single_sampled](VK_EXT_multisampled_render_to_single_sampled.html)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_multisampled_render_to_swapchain] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_multisampled_render_to_swapchain extension*)

**Extension Proposal**

[VK_EXT_multisampled_render_to_swapchain](../../../../features/latest/features/proposals/VK_EXT_multisampled_render_to_swapchain.html)

**Last Modified Date**

2025-05-20

**IP Status**

No known IP claims.

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Mike Blumenkrantz, Valve

* 
James Jones, NVIDIA

This extension adds the equivalent of
[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](VkImageCreateFlagBits.html) to
swapchain create flags such that the functionality of the
`[VK_EXT_multisampled_render_to_single_sampled](VK_EXT_multisampled_render_to_single_sampled.html)` extension can be used
with its images.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT](VkPhysicalDeviceMultisampledRenderToSwapchainFeaturesEXT.html)

Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

* 
[VkSwapchainFlagsSurfaceCapabilitiesEXT](VkSwapchainFlagsSurfaceCapabilitiesEXT.html)

* 
`VK_EXT_MULTISAMPLED_RENDER_TO_SWAPCHAIN_EXTENSION_NAME`

* 
`VK_EXT_MULTISAMPLED_RENDER_TO_SWAPCHAIN_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTISAMPLED_RENDER_TO_SWAPCHAIN_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SWAPCHAIN_FLAGS_SURFACE_CAPABILITIES_EXT](VkStructureType.html)

Extending [VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html):

* 
[VK_SWAPCHAIN_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](VkSwapchainCreateFlagBitsKHR.html)

* 
Revision 1, 2025-05-20 (Shahbaz Youssefi)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_multisampled_render_to_swapchain).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
