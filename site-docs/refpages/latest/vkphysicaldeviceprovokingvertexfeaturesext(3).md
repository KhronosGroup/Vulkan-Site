# VkPhysicalDeviceProvokingVertexFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceProvokingVertexFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceProvokingVertexFeaturesEXT - Structure describing the provoking vertex features that can be supported by an implementation

The `VkPhysicalDeviceProvokingVertexFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_provoking_vertex
typedef struct VkPhysicalDeviceProvokingVertexFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           provokingVertexLast;
    VkBool32           transformFeedbackPreservesProvokingVertex;
} VkPhysicalDeviceProvokingVertexFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `provokingVertexLast` indicates
whether the implementation supports the
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](VkProvokingVertexModeEXT.html)
[provoking vertex mode](../../../../spec/latest/chapters/vertexpostproc.html#VkProvokingVertexModeEXT) for flat shading.

* 

`transformFeedbackPreservesProvokingVertex` indicates that the order
of vertices within each primitive written by transform feedback will
preserve the provoking vertex.
This does not apply to triangle fan primitives when
[    `transformFeedbackPreservesTriangleFanProvokingVertex`](../../../../spec/latest/chapters/limits.html#limits-transformFeedbackPreservesTriangleFanProvokingVertex) is
[VK_FALSE](VK_FALSE.html).
`transformFeedbackPreservesProvokingVertex` **must** be [VK_FALSE](VK_FALSE.html)
when the `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` extension is not supported.

If the `VkPhysicalDeviceProvokingVertexFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceProvokingVertexFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

When `VkPhysicalDeviceProvokingVertexFeaturesEXT` is in the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) but the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature is not enabled, the value of
`transformFeedbackPreservesProvokingVertex` is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceProvokingVertexFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceProvokingVertexFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROVOKING_VERTEX_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_provoking_vertex](VK_EXT_provoking_vertex.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceProvokingVertexFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
