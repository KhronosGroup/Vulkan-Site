# VK_KHR_maintenance4(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance4.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance4](#VK_KHR_maintenance4)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance4 - device extension

**Name String**

`VK_KHR_maintenance4`

**Extension Type**

Device extension

**Registered Extension Number**

414

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance4] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_KHR_maintenance4 extension*)

**Last Modified Date**

2021-10-25

**Interactions and External Dependencies**

* 
Requires SPIR-V 1.2 for `LocalSizeId`

**Contributors**

* 
Lionel Duc, NVIDIA

* 
Faith Ekstrand, Intel

* 
Spencer Fricke, Samsung

* 
Tobias Hector, AMD

* 
Lionel Landwerlin, Intel

* 
Graeme Leese, Broadcom

* 
Tom Olson, Arm

* 
Stu Smith, AMD

* 
Yiwei Zhang, Google

`VK_KHR_maintenance4` adds a collection of minor features, none of which
would warrant an entire extension of their own.

The new features are as follows:

* 
Allow the application to destroy their [VkPipelineLayout](VkPipelineLayout.html) object
immediately after it was used to create another object.
It is no longer necessary to keep its handle valid while the created
object is in use.

* 
Add a new [`maxBufferSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxBufferSize)
implementation-defined limit for the maximum size `VkBuffer` that
**can** be created.

* 
Add support for the SPIR-V 1.2 `LocalSizeId` execution mode, which
can be used as an alternative to `LocalSize` to specify the local
workgroup size with specialization constants.

* 
Add a guarantee that images created with identical creation parameters
will always have the same alignment requirements.

* 
Add new [vkGetDeviceBufferMemoryRequirementsKHR](vkGetDeviceBufferMemoryRequirements.html),
[vkGetDeviceImageMemoryRequirementsKHR](vkGetDeviceImageMemoryRequirements.html), and
[vkGetDeviceImageSparseMemoryRequirementsKHR](vkGetDeviceImageSparseMemoryRequirements.html) to allow the
application to query the image memory requirements without having to
create an image object and query it.

* 
Relax the requirement that push constants must be initialized before
they are dynamically accessed.

* 
Relax the interface matching rules to allow a larger output vector to
match with a smaller input vector, with additional values being
discarded.

* 
Add a guarantee for buffer memory requirement that the size memory
requirement is never greater than the result of aligning create size
with the alignment memory requirement.

* 
[vkGetDeviceBufferMemoryRequirementsKHR](vkGetDeviceBufferMemoryRequirements.html)

* 
[vkGetDeviceImageMemoryRequirementsKHR](vkGetDeviceImageMemoryRequirements.html)

* 
[vkGetDeviceImageSparseMemoryRequirementsKHR](vkGetDeviceImageSparseMemoryRequirements.html)

* 
[VkDeviceBufferMemoryRequirementsKHR](VkDeviceBufferMemoryRequirements.html)

* 
[VkDeviceImageMemoryRequirementsKHR](VkDeviceImageMemoryRequirements.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMaintenance4FeaturesKHR](VkPhysicalDeviceMaintenance4Features.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMaintenance4PropertiesKHR](VkPhysicalDeviceMaintenance4Properties.html)

* 
`VK_KHR_MAINTENANCE_4_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_4_SPEC_VERSION`

* 
Extending [VkImageAspectFlagBits](VkImageAspectFlagBits.html):

[VK_IMAGE_ASPECT_NONE_KHR](VkImageAspectFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DEVICE_BUFFER_MEMORY_REQUIREMENTS_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_IMAGE_MEMORY_REQUIREMENTS_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_PROPERTIES_KHR](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the KHR
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

None.

* 
Revision 1, 2021-08-18 (Piers Daniell)

Internal revisions

Revision 2, 2021-10-25 (Yiwei Zhang)

* 
More guarantees on buffer memory requirements

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance4).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
