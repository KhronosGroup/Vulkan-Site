# VK_EXT_provoking_vertex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_provoking_vertex.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_provoking_vertex](#VK_EXT_provoking_vertex)
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

VK_EXT_provoking_vertex - device extension

**Name String**

`VK_EXT_provoking_vertex`

**Extension Type**

Device extension

**Registered Extension Number**

255

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Jesse Hall [jessehall](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_provoking_vertex] @jessehall%0A*Here describe the issue or question you have about the VK_EXT_provoking_vertex extension*)

**Last Modified Date**

2021-02-22

**IP Status**

No known IP claims.

**Contributors**

* 
Alexis Hétu, Google

* 
Bill Licea-Kane, Qualcomm

* 
Daniel Koch, Nvidia

* 
Jamie Madill, Google

* 
Jan-Harald Fredriksen, Arm

* 
Faith Ekstrand, Intel

* 
Jeff Bolz, Nvidia

* 
Jeff Leger, Qualcomm

* 
Jesse Hall, Google

* 
Jörg Wagner, Arm

* 
Matthew Netsch, Qualcomm

* 
Mike Blumenkrantz, Valve

* 
Piers Daniell, Nvidia

* 
Tobias Hector, AMD

This extension allows changing the provoking vertex convention between
Vulkan’s default convention (first vertex) and OpenGL’s convention (last
vertex).

This extension is intended for use by API-translation layers that implement
APIs like OpenGL on top of Vulkan, and need to match the source API’s
provoking vertex convention.
Applications using Vulkan directly should use Vulkan’s default convention.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceProvokingVertexFeaturesEXT](VkPhysicalDeviceProvokingVertexFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceProvokingVertexPropertiesEXT](VkPhysicalDeviceProvokingVertexPropertiesEXT.html)

Extending [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html):

* 
[VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](VkPipelineRasterizationProvokingVertexStateCreateInfoEXT.html)

* 
[VkProvokingVertexModeEXT](VkProvokingVertexModeEXT.html)

* 
`VK_EXT_PROVOKING_VERTEX_EXTENSION_NAME`

* 
`VK_EXT_PROVOKING_VERTEX_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROVOKING_VERTEX_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROVOKING_VERTEX_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_PROVOKING_VERTEX_STATE_CREATE_INFO_EXT](VkStructureType.html)

1) At what granularity should this state be set?

**RESOLVED**: At pipeline bind, with an optional per-render pass restriction.

The most natural place to put this state is in the graphics pipeline object.
Some implementations require it to be known when creating the pipeline, and
pipeline state is convenient for implementing OpenGL 3.2’s
glProvokingVertex, which can change the state between draw calls.
However, some implementations can only change it approximately render pass
granularity.
To accommodate both, provoking vertex will be pipeline state, but
implementations can require that only one mode is used within a render pass
instance; the render pass’s mode is chosen implicitly when the first
pipeline is bound.

2) Does the provoking vertex mode affect the order that vertices are written
to transform feedback buffers?

**RESOLVED**: Yes, to enable layered implementations of OpenGL and D3D.

All of OpenGL, OpenGL ES, and Direct3D 11 require that vertices are written
to transform feedback buffers such that flat-shaded attributes have the same
value when drawing the contents of the transform feedback buffer as they did
in the original drawing when the transform feedback buffer was written
(assuming the provoking vertex mode has not changed, in APIs that support
more than one mode).

* 
Revision 1, (1c) 2021-02-22 (Jesse Hall)

Added
VkPhysicalDeviceProvokingVertexPropertiesEXT::transformFeedbackPreservesTriangleFanProvokingVertex
to accommodate implementations that cannot change the transform
feedback vertex order for triangle fans.

Revision 1, (1b) 2020-06-14 (Jesse Hall)

* 
Added
VkPhysicalDeviceProvokingVertexFeaturesEXT::transformFeedbackPreservesProvokingVertex
and required that transform feedback write vertices so as to preserve
the provoking vertex of each primitive.

Revision 1, (1a) 2019-10-23 (Jesse Hall)

* 
Initial draft, based on a proposal by Alexis Hétu

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_provoking_vertex).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
