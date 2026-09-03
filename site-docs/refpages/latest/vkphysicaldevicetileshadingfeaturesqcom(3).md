# VkPhysicalDeviceTileShadingFeaturesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceTileShadingFeaturesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceTileShadingFeaturesQCOM - Structure describing tile shading features that can be supported by an implementation

The `VkPhysicalDeviceTileShadingFeaturesQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkPhysicalDeviceTileShadingFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           tileShading;
    VkBool32           tileShadingFragmentStage;
    VkBool32           tileShadingColorAttachments;
    VkBool32           tileShadingDepthAttachments;
    VkBool32           tileShadingStencilAttachments;
    VkBool32           tileShadingInputAttachments;
    VkBool32           tileShadingSampledAttachments;
    VkBool32           tileShadingPerTileDraw;
    VkBool32           tileShadingPerTileDispatch;
    VkBool32           tileShadingDispatchTile;
    VkBool32           tileShadingApron;
    VkBool32           tileShadingAnisotropicApron;
    VkBool32           tileShadingAtomicOps;
    VkBool32           tileShadingImageProcessing;
} VkPhysicalDeviceTileShadingFeaturesQCOM;

This structure describes the following features:

* 
 `tileShading` indicates that the
implementation supports [tile shading render    pass](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading) instances.

* 
 `tileShadingFragmentStage`
indicates that the implementation supports tile shading in the fragment
stage.

* 

`tileShadingColorAttachments` indicates that the implementation
supports access to color attachments in a tile shader.

* 

`tileShadingDepthAttachments` indicates that the implementation
supports access to depth aspect of depth stencil attachments.

* 

`tileShadingStencilAttachments` indicates that the implementation
supports access to stencil aspect of depth stencil attachments.

* 

`tileShadingInputAttachments` indicates that the implementation
supports access to input attachments.

* 

`tileShadingSampledAttachments` indicates that the implementation
supports access to sampling of tile attachments.

* 
 `tileShadingPerTileDraw`
indicates that the implementation supports the recording of vkCmdDraw*
commands when [per-tile execution    model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is enabled.

* 
 `tileShadingPerTileDispatch`
indicates that the implementation supports the recording of
`vkCmdDispatch`* commands within those regions of a command buffer
where the [per-tile execution    model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is enabled.

* 
 `tileShadingDispatchTile`
indicates that the implementation supports the recording of
[vkCmdDispatchTileQCOM](vkCmdDispatchTileQCOM.html) commands.

* 
 `tileShadingApron` indicates that the
implementation supports
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`apronSize` value other
than (0,0).
See [Tiling Aprons](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading-aprons) for more
information.

* 

`tileShadingAnisotropicApron` indicates that the implementation
supports [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`apronSize`
set to a value where `apronSize.width` differs from
`apronSize.height`.

* 
 `tileShadingAtomicOps` indicates
that the implementation supports atomic operations on
[tile attachment variables](../../../../spec/latest/chapters/interfaces.html#interfaces-tile-attachment).

* 
 `tileShadingImageProcessing`
indicates that the implementation supports [image    processing operations](../../../../spec/latest/chapters/textures.html#textures-weightimage) with tile attachments.

If the `VkPhysicalDeviceTileShadingFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceTileShadingFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTileShadingFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceTileShadingFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_SHADING_FEATURES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceTileShadingFeaturesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
