# VK_KHR_maintenance9(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance9.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance9](#VK_KHR_maintenance9)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance9 - device extension

**Name String**

`VK_KHR_maintenance9`

**Extension Type**

Device extension

**Registered Extension Number**

585

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance9] @zmike%0A*Here describe the issue or question you have about the VK_KHR_maintenance9 extension*)

**Extension Proposal**

[VK_KHR_maintenance9](../../../../features/latest/features/proposals/VK_KHR_maintenance9.html)

**Last Modified Date**

2025-05-29

**Interactions and External Dependencies**
**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Shahbaz Youssefi, Google

* 
Hans-Kristian Arntzen, Valve

* 
Piers Daniell, NVIDIA

* 
Daniel Story, Nintendo

* 
Jeff Bolz, NVIDIA

[VK_KHR_maintenance9](#) adds a collection of minor features, none of
which would warrant an entire extension of their own.

The new features are as follows:

* 
Support VkDevice with no queues.
These can be used as effectively an offline compiler to prepopulate
pipeline caches, without expensive queue creation or internal memory
allocations.

* 
Allow `vkCmdSetEvent2` to not provide a dependency, providing
`vkCmdSetEvent`-style usage using enums from `VK_KHR_synchronization2`

* 
Add a
[VkQueryPoolCreateFlagBits](VkQueryPoolCreateFlagBits.html)::[VK_QUERY_POOL_CREATE_RESET_BIT_KHR](VkQueryPoolCreateFlagBits.html)
flag to create a query pool with all queries initialized to the reset
state.

* 
Allow any integer bit width for specific bit-wise operations.

* 
Add a property to enable sparse support with
`VK_EXT_image_2d_view_of_3d`.

* 
Add a property to indicate the implementation will return (0,0,0,0) or
(0,0,0,1) to vertex shaders that read unassigned attributes.

* 
The effects of image memory barriers and image layout transitions on 3D
images created with VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT are scoped
to the slices specified by the user-provided VkImageSubresourceRange.

* 
Queue family ownership transfers are no longer required for buffers and
linear images, and a new physical device queue family property is
exposed to indicate whether queue family ownership transfers are
required for optimal images.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMaintenance9FeaturesKHR](VkPhysicalDeviceMaintenance9FeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMaintenance9PropertiesKHR](VkPhysicalDeviceMaintenance9PropertiesKHR.html)

Extending [VkQueueFamilyProperties2](VkQueueFamilyProperties2.html):

* 
[VkQueueFamilyOwnershipTransferPropertiesKHR](VkQueueFamilyOwnershipTransferPropertiesKHR.html)

* 
[VkDefaultVertexAttributeValueKHR](VkDefaultVertexAttributeValueKHR.html)

* 
`VK_KHR_MAINTENANCE_9_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_9_SPEC_VERSION`

* 
Extending [VkDependencyFlagBits](VkDependencyFlagBits.html):

[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html)

Extending [VkQueryPoolCreateFlagBits](VkQueryPoolCreateFlagBits.html):

* 
[VK_QUERY_POOL_CREATE_RESET_BIT_KHR](VkQueryPoolCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_9_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_9_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_OWNERSHIP_TRANSFER_PROPERTIES_KHR](VkStructureType.html)

None.

* 
Revision 1, 2025-05-29 (Contributors)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance9).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
