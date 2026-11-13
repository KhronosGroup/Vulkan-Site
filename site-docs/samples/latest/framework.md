# Framework

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/framework/README.html

## Table of Contents

- [Sample base classes](#_sample_base_classes)
- [Sample_base_classes](#_sample_base_classes)
- [High level base sample class](#_high_level_base_sample_class)
- [High_level_base_sample_class](#_high_level_base_sample_class)
- [API sample base class](#_api_sample_base_class)
- [API_sample_base_class](#_api_sample_base_class)
- [Support for Vulkan-Hpp](#_support_for_vulkan_hpp)
- [Support_for_Vulkan-Hpp](#_support_for_vulkan_hpp)
- [Commonly used framework concepts](#_commonly_used_framework_concepts)
- [Commonly_used_framework_concepts](#_commonly_used_framework_concepts)
- [Enabling extensions](#_enabling_extensions)
- [Changing the Vulkan api version](#_changing_the_vulkan_api_version)
- [Changing_the_Vulkan_api_version](#_changing_the_vulkan_api_version)
- [Requesting GPU features](#_requesting_gpu_features)
- [Requesting_GPU_features](#_requesting_gpu_features)
- [Extending the graphical user interface](#_extending_the_graphical_user_interface)
- [Extending_the_graphical_user_interface](#_extending_the_graphical_user_interface)
- [Loading models](#_loading_models)
- [Loading images](#_loading_images)
- [Loading shaders](#_loading_shaders)

## Content

This folder contains the base framework used by the samples.
It offers sample base classes, encapsulates common functionality for e.g.
loading assets (images, models, shaders), wraps common Vulkan objects and implements frequently used concepts like a cache and a scene graph.
The framework also implements platform support for Windows, Linux, MacOS and Android.

It can be used as a guideline for writing advanced Vulkan applications.

Before trying to implement common functions, consider checking if the framework doesn’t already provides what you are looking for.

The framework provides two different sample base classes.
When [creating new samples](../scripts/README.html), you can choose between one of them:

This base class abstracts away most of the Vulkan API calls and as such makes heavy use of the Vulkan object wrapper classes of the framework.
Writing samples with the base class is less verbose.

See [vulkan_sample.h](./vulkan_sample.h) and [vulkan_sample.cpp](./vulkan_sample.cpp).

This base class uses less abstraction, letting you work more explicitly with the api.

See [api_vulkan_sample.h](./api_vulkan_sample.h) and [api_vulkan_sample.cpp](./api_vulkan_sample.cpp).

While the framework itself primarily uses the C-Interface for Vulkan, both the high level and the API sample base class also come with [Vulkan-Hpp](https://github.com/KhronosGroup/Vulkan-Hpp) variants, letting you write samples using the C++ Vulkan language bindings instead.

See [hpp_vulkan_sample.h](./hpp_vulkan_sample.h) / [hpp_vulkan_sample.cpp](./hpp_vulkan_sample.cpp) and [hpp_api_vulkan_sample.h](./hpp_api_vulkan_sample.h) / [hpp_api_vulkan_sample.cpp](./hpp_api_vulkan_sample.cpp).

Vulkan is an extensible api.
New features are usually exposed through either instance or device extensions.
Extensions can be enabled in the constructor of both the high level and api base sample class:

MySample::MySample()
{
    add_instance_extension(VK_SOME_INSTANCE_EXTENSION_NAME);
    add_device_extension(VK_SOME_DEVICE_EXTENSION_NAME);
}

|  | The framework uses the [Volk](https://github.com/zeux/volk) meta-loader, which will automatically load extension function pointers for all enabled extensions.
| --- | --- |
There is no need to manually get extension pointer functions. |

By default all samples create a Vulkan 1.1 instance.
Higher versions can be requested in the constructor of a sample:

MySample::MySample()
{
    set_api_version(VK_API_VERSION_1_2);
}

Most extensions also require enabling corresponding feature flags.
This can be done by overriding the `request_gpu_features` function of the base class:

void MySample::request_gpu_features(vkb::PhysicalDevice &gpu)
{
    // Get a reference to the feature structure required for an extension
    auto &requested_extension_feature = gpu
    request_extension_features(VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SOME_EXTENSION_FEATURES_KHR);

    // Enable a selected feature
    requested_extension_feature.featureName = VK_TRUE;
}

The framework includes a graphical user interface based on [Dear ImGui](https://github.com/ocornut/imgui).
This can be used by samples to display values and add controls like buttons, dropdowns, etc.

To add additional elements to the UI of a sample, you override the respective function from the base class:

Samples based on the high level base class need to override the `draw_gui` function:

void MySample::draw_gui()
{
    if (ImGui::Checkbox("Enable Option", &option_enabled))
    {
        ...
    }
}

Samples based on the api base class need to override the `on_update_ui_overlay` function:

void MyApiSample::on_update_ui_overlay(vkb::Drawer &drawer)
{
     if (drawer.checkbox("Enable option", &option_enabled))
    {
        ...
    }
}

The framework supports [glTF models](https://www.khronos.org/gltf/) and includes a loader for this format.

The high level base class works with a single glTF scene loaded at startup.
The scene is part of the base class, and there is no need to explicitly draw it:

bool MySample::prepare(const vkb::ApplicationOptions &options)
{
    scene = load_scene("filename.gltf");
}

With the api base class are explicitly declared, loaded and rendered:

// my_sample.h
class MyApiSample : public ApiVulkanSample
{
    std::unique_ptr modelA;
    std::unique_ptr modelB;
    ...
}

// my_sample.cpp
bool MyApiSample::prepare(const vkb::ApplicationOptions &options)
{
    modelA = load_model("filenameA.gltf");
    modelB = load_model("filenameB.gltf");
}

void MyApiSample::build_command_buffers()
{
    vkBeginCommandBuffer(...);
    ...
    draw_model(modelA, draw_cmd_buffers[i]);
    ...
    draw_model(modelB, draw_cmd_buffers[i]);
    ...
    vkEndCommandBufer(...);
}

The framework supports the [KTX](https://www.khronos.org/ktx/) GPU container format and includes a loader for this format.
As a container format, KTX supports different image formats ranging from basic RGBA images to compressed formats.

texture = load_texture("rgba_texture.ktx", vkb::sg::Image::Color);

Images (textures) loaded like this can then be used as descriptors later on:

VkDescriptorImageInfo  image_descriptor = create_descriptor(texture);

The framework supports loading textual GLSL shaders.
These shaders are then compiled to [SPIR-V](https://registry.khronos.org/SPIR-V/specs/unified1/SPIRV.html) at runtime so Vulkan can ingest them.

With the high level base class, shaders are attached to the scene graphics' render pipeline:

vkb::ShaderSource vert_shader("vs.vert");
vkb::ShaderSource frag_shader("fs.frag");
auto              scene_subpass = std::make_unique(get_render_context(), std::move(vert_shader), std::move(frag_shader), *scene, *camera);

auto render_pipeline = vkb::RenderPipeline();
render_pipeline.add_subpass(std::move(scene_subpass));

set_render_pipeline(std::move(render_pipeline));

While in the api base class, this is again more explicitly by creating shader modules used at pipeline creation time:

std::array shader_stages;
...
shader_stages[0] = load_shader("vs.vert", VK_SHADER_STAGE_VERTEX_BIT);
shader_stages[1] = load_shader("fs.frag", VK_SHADER_STAGE_FRAGMENT_BIT);
VK_CHECK(vkCreateGraphicsPipelines(get_device().get_handle(), pipeline_cache, 1, &pipeline_create_info, nullptr, &pipeline));
