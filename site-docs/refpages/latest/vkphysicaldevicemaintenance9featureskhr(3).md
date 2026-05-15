# VkPhysicalDeviceMaintenance9FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance9FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance9FeaturesKHR - Structure describing whether the implementation supports maintenance9 functionality

The `VkPhysicalDeviceMaintenance9FeaturesKHR` structure is defined as:

// Provided by VK_KHR_maintenance9
typedef struct VkPhysicalDeviceMaintenance9FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance9;
} VkPhysicalDeviceMaintenance9FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance9` indicates that the
implementation supports the following:

The restriction that certain bitfield SPIR-V instructions only operate
on 32-bit integers is relaxed.

* 
The value returned when a vertex shader reads an unbound vertex
attribute is defined by way of the
[     `defaultVertexAttributeValue`](../../../../spec/latest/chapters/limits.html#limits-defaultVertexAttributeValue) property.

* 
A new
[VkQueryPoolCreateFlagBits](VkQueryPoolCreateFlagBits.html)::[VK_QUERY_POOL_CREATE_RESET_BIT_KHR](VkQueryPoolCreateFlagBits.html)
flag **can** be used to initialize all queries in query pool to the reset
state on creation.

* 
[vkCmdSetEvent2](vkCmdSetEvent2.html) **may** not provide a dependency other than the event
src stage mask.

* 
The effects of image memory barriers and image layout transitions on 3D
images created with [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) are
limited to only those slices specified in `VkImageSubresourceRange`

* 
A device **can** be created with no queues.
This can be used for compiling pipelines or shaders for the purpose of
filling pipeline caches.

* 
Queue family ownership transfers are no longer required for buffers and
linear images.
For optimally tiled images, a new physical device query is added to
check if resources created with [VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html) **can**
automatically transfer ownership between two queue families.

* 
[`image2DViewOf3DSparse`](../../../../spec/latest/chapters/limits.html#limits-image2DViewOf3DSparse) enables
2D views of 3D sparse images.

If the `VkPhysicalDeviceMaintenance9FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMaintenance9FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance9FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance9FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_9_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_maintenance9](VK_KHR_maintenance9.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMaintenance9FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
