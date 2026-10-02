# VK_KHR_present_id2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_present_id2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_present_id2](#VK_KHR_present_id2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_present_id2 - device extension

**Name String**

`VK_KHR_present_id2`

**Extension Type**

Device extension

**Registered Extension Number**

480

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

and

[VK_KHR_surface](VK_KHR_surface.html)

and

[VK_KHR_swapchain](VK_KHR_swapchain.html)

**Contact**

* 
Daniel Stone

**Extension Proposal**

[VK_KHR_present_id2](../../../../features/latest/features/proposals/VK_KHR_present_id2.html)

**Last Modified Date**

2025-01-06

**IP Status**

No known IP claims.

**Contributors**

* 
Hans-Kristian Arntzen, Valve

* 
James Jones, NVIDIA

* 
Daniel Stone, Collabora

* 
Derek Foreman, Collabora

* 
*contributors to `[VK_KHR_present_id](VK_KHR_present_id.html)`*

This device extension allows an application that uses the
`[VK_KHR_swapchain](VK_KHR_swapchain.html)` extension to provide an identifier for present
operations on a swapchain.
An application **can** use this to reference specific present operations in
other extensions.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePresentId2FeaturesKHR](VkPhysicalDevicePresentId2FeaturesKHR.html)

Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

* 
[VkPresentId2KHR](VkPresentId2KHR.html)

Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

* 
[VkSurfaceCapabilitiesPresentId2KHR](VkSurfaceCapabilitiesPresentId2KHR.html)

* 
`VK_KHR_PRESENT_ID_2_EXTENSION_NAME`

* 
`VK_KHR_PRESENT_ID_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_ID_2_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PRESENT_ID_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_ID_2_KHR](VkStructureType.html)

Extending [VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html):

* 
[VK_SWAPCHAIN_CREATE_PRESENT_ID_2_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html)

None.

* 
Revision 1, 2022-05-10 (Daniel Stone)

Repurposed VK_KHR_present_id to be driven by surface capabilities

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_present_id2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
