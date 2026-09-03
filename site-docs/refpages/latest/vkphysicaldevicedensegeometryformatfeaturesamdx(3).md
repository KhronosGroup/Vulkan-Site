# VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX - Structure describing dense geometry format features that can be supported by an implementation

The `VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX` structure is
defined as:

// Provided by VK_AMDX_dense_geometry_format
typedef struct VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           denseGeometryFormat;
} VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `denseGeometryFormat` specifies
whether the implementation supports DGF1 compressed geometry data.

If the `VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX-sType-sType) VUID-VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DENSE_GEOMETRY_FORMAT_FEATURES_AMDX](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_AMDX_dense_geometry_format](VK_AMDX_dense_geometry_format.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
