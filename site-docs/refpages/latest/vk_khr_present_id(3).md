# VK_KHR_present_id(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_present_id.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_present_id](#VK_KHR_present_id)
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

VK_KHR_present_id - device extension

**Name String**

`VK_KHR_present_id`

**Extension Type**

Device extension

**Registered Extension Number**

295

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Keith Packard [keithp](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_present_id] @keithp%0A*Here describe the issue or question you have about the VK_KHR_present_id extension*)

**Last Modified Date**

2019-05-15

**IP Status**

No known IP claims.

**Contributors**

* 
Keith Packard, Valve

* 
Ian Elliott, Google

* 
Alon Or-bach, Samsung

This device extension allows an application that uses the
`[VK_KHR_swapchain](VK_KHR_swapchain.html)` extension to provide an identifier for present
operations on a swapchain.
An application **can** use this to reference specific present operations in
other extensions.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePresentIdFeaturesKHR](VkPhysicalDevicePresentIdFeaturesKHR.html)

Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

* 
[VkPresentIdKHR](VkPresentIdKHR.html)

* 
`VK_KHR_PRESENT_ID_EXTENSION_NAME`

* 
`VK_KHR_PRESENT_ID_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_ID_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PRESENT_ID_KHR](VkStructureType.html)

None.

* 
Revision 1, 2019-05-15 (Keith Packard)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_present_id).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
