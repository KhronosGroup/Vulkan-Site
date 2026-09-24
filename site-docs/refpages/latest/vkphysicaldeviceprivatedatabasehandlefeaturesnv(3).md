# VkPhysicalDevicePrivateDataBaseHandleFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePrivateDataBaseHandleFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePrivateDataBaseHandleFeaturesNV - Structure describing private data base handle features that can be supported by an implementation

The `VkPhysicalDevicePrivateDataBaseHandleFeaturesNV` structure is
defined as:

// Provided by VK_NV_private_data_base_handle
typedef struct VkPhysicalDevicePrivateDataBaseHandleFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           privateDataBaseHandle;
} VkPhysicalDevicePrivateDataBaseHandleFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `privateDataBaseHandle` indicates
that the implementation supports querying its base handle for any
device-level object by creating a [VkPrivateDataSlot](VkPrivateDataSlot.html) with
[VK_PRIVATE_DATA_SLOT_CREATE_BASE_OBJECT_HANDLE_BIT_NV](VkPrivateDataSlotCreateFlagBits.html) and calling
`vkGetPrivateData`.

If the `VkPhysicalDevicePrivateDataBaseHandleFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevicePrivateDataBaseHandleFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePrivateDataBaseHandleFeaturesNV-sType-sType) VUID-VkPhysicalDevicePrivateDataBaseHandleFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIVATE_DATA_BASE_HANDLE_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_private_data_base_handle](VK_NV_private_data_base_handle.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevicePrivateDataBaseHandleFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
