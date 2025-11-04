// ...existing code...
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonToast,
} from "@ionic/react";
import PostService from "../services/PostService";

const PostPage: React.FC = () => {
  const emptyForm = {
    nombre_usuario: "",
    nombre_categoria: "",
    titulo: "",
    contenido: "",
    url_imagen: "",
  };

  const [id, setId] = useState("");
  const [form, setForm] = useState({ ...emptyForm });
  const [createForm, setCreateForm] = useState({ ...emptyForm });
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadPosts = async () => {
    try {
      const res = await PostService.getAllPosts(page, limit);
      const list = res.posts || res;
      setPosts(list);
      setMessage("");
    } catch (err: any) {
      setMessage(err.message || JSON.stringify(err));
    }
  };

  const loadPost = async () => {
    if (!id) return setMessage("Ingresa un id");
    try {
      const res = await PostService.getPostById(id);
      const p = res.post || res;
      setForm({
        nombre_usuario:
          p.User?.nombre_usuario || p.User?.nombre || p.nombre_usuario || "",
        nombre_categoria: p.Category?.nombre || p.nombre_categoria || "",
        titulo: p.titulo || "",
        contenido: p.contenido || "",
        url_imagen: p.url_imagen || "",
      });
      setMessage("Post cargado para editar");
    } catch (err: any) {
      setMessage(err.message || JSON.stringify(err));
    }
  };

  const handleCreate = async () => {
    try {
      const res = await PostService.createPost(createForm);
      setMessage(res.message || "Post creado");
      setCreateForm({ ...emptyForm });
      loadPosts();
    } catch (err: any) {
      setMessage(err.message || JSON.stringify(err));
    }
  };

  const handleUpdate = async () => {
    if (!id) return setMessage("Ingresa un id para actualizar");
    try {
      const res = await PostService.updatePost(id, form);
      setMessage(res.message || "Post actualizado");
      loadPosts();
    } catch (err: any) {
      setMessage(err.message || JSON.stringify(err));
    }
  };

  const handleDelete = async (deleteId?: string) => {
    const targetId = deleteId || id;
    if (!targetId) return setMessage("Ingresa un id para eliminar");
    try {
      const res = await PostService.deletePost(targetId);
      setMessage(res.message || "Post eliminado");
      if (!deleteId) {
        setForm({ ...emptyForm });
        setId("");
      }
      loadPosts();
    } catch (err: any) {
      setMessage(err.message || JSON.stringify(err));
    }
  };

  const startEdit = (p: any) => {
    setId(p.id ?? p._id ?? "");
    setForm({
      nombre_usuario:
        p.User?.nombre_usuario || p.User?.nombre || p.nombre_usuario || "",
      nombre_categoria: p.Category?.nombre || p.nombre_categoria || "",
      titulo: p.titulo || "",
      contenido: p.contenido || "",
      url_imagen: p.url_imagen || "",
    });
    setMessage("Editando post seleccionado");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/inicio" />
          </IonButtons>
          <IonTitle>CRUD de Posts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Crear Post</IonCardTitle>
                </IonCardHeader>
                <IonList>
                  <IonItem>
                    <IonLabel position="stacked">Usuario</IonLabel>
                    <IonInput
                      value={createForm.nombre_usuario}
                      onIonChange={(e: any) =>
                        setCreateForm({
                          ...createForm,
                          nombre_usuario: e.detail.value || "",
                        })
                      }
                      placeholder="Usuario"
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Categoría</IonLabel>
                    <IonInput
                      value={createForm.nombre_categoria}
                      onIonChange={(e: any) =>
                        setCreateForm({
                          ...createForm,
                          nombre_categoria: e.detail.value || "",
                        })
                      }
                      placeholder="Categoría"
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Título</IonLabel>
                    <IonInput
                      value={createForm.titulo}
                      onIonChange={(e: any) =>
                        setCreateForm({
                          ...createForm,
                          titulo: e.detail.value || "",
                        })
                      }
                      placeholder="Título"
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Contenido</IonLabel>
                    <IonTextarea
                      value={createForm.contenido}
                      onIonChange={(e: any) =>
                        setCreateForm({
                          ...createForm,
                          contenido: e.detail.value || "",
                        })
                      }
                      placeholder="Contenido"
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">URL imagen</IonLabel>
                    <IonInput
                      value={createForm.url_imagen}
                      onIonChange={(e: any) =>
                        setCreateForm({
                          ...createForm,
                          url_imagen: e.detail.value || "",
                        })
                      }
                      placeholder="URL imagen"
                    />
                  </IonItem>

                  <IonItem lines="none">
                    <IonButton expand="block" onClick={handleCreate}>
                      Crear
                    </IonButton>
                  </IonItem>
                </IonList>
              </IonCard>
            </IonCol>

            <IonCol sizeMd="6" size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Editar / Eliminar por Id</IonCardTitle>
                </IonCardHeader>

                <IonList>
                  <IonItem>
                    <IonLabel position="stacked">Id del post</IonLabel>
                    <IonInput
                      value={id}
                      onIonChange={(e: any) => setId(e.detail.value || "")}
                    />
                  </IonItem>

                  <IonItem lines="none">
                    <IonButton onClick={loadPost} color="primary">
                      Cargar
                    </IonButton>
                    <IonButton
                      onClick={handleUpdate}
                      color="tertiary"
                      style={{ marginLeft: 8 }}
                    >
                      Actualizar
                    </IonButton>
                    <IonButton
                      onClick={() => handleDelete()}
                      color="danger"
                      style={{ marginLeft: 8 }}
                    >
                      Eliminar
                    </IonButton>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Usuario</IonLabel>
                    <IonInput
                      value={form.nombre_usuario}
                      onIonChange={(e: any) =>
                        setForm({
                          ...form,
                          nombre_usuario: e.detail.value || "",
                        })
                      }
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Categoría</IonLabel>
                    <IonInput
                      value={form.nombre_categoria}
                      onIonChange={(e: any) =>
                        setForm({
                          ...form,
                          nombre_categoria: e.detail.value || "",
                        })
                      }
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Título</IonLabel>
                    <IonInput
                      value={form.titulo}
                      onIonChange={(e: any) =>
                        setForm({ ...form, titulo: e.detail.value || "" })
                      }
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Contenido</IonLabel>
                    <IonTextarea
                      value={form.contenido}
                      onIonChange={(e: any) =>
                        setForm({ ...form, contenido: e.detail.value || "" })
                      }
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">URL Imagen</IonLabel>
                    <IonInput
                      value={form.url_imagen}
                      onIonChange={(e: any) =>
                        setForm({ ...form, url_imagen: e.detail.value || "" })
                      }
                    />
                  </IonItem>
                </IonList>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Lista de Posts</IonCardTitle>
                </IonCardHeader>

                <div style={{ padding: 12 }}>
                  <IonButton
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    fill="outline"
                  >
                    Anterior
                  </IonButton>
                  <span style={{ margin: "0 12px" }}>Página {page}</span>
                  <IonButton
                    onClick={() => setPage((p) => p + 1)}
                    fill="outline"
                  >
                    Siguiente
                  </IonButton>
                  <IonButton onClick={loadPosts} style={{ marginLeft: 8 }}>
                    Refrescar
                  </IonButton>
                </div>

                <IonList>
                  {posts.length === 0 ? (
                    <IonItem>
                      <IonLabel>No hay posts</IonLabel>
                    </IonItem>
                  ) : (
                    posts.map((p: any) => (
                      <IonItem key={p.id ?? p._id}>
                        <IonLabel>
                          <h3>{p.titulo}</h3>
                          <p>
                            {p.User?.nombre_usuario ||
                              p.User?.nombre ||
                              p.nombre_usuario ||
                              "—"}
                            {" — "}
                            {p.Category?.nombre || p.nombre_categoria || "—"}
                          </p>
                          <p style={{ wordBreak: "break-all", fontSize: 12 }}>
                            {p.id ?? p._id}
                          </p>
                        </IonLabel>
                        <IonButton
                          slot="end"
                          onClick={() => startEdit(p)}
                          size="small"
                        >
                          Editar
                        </IonButton>
                        <IonButton
                          slot="end"
                          color="danger"
                          onClick={() => handleDelete(p.id ?? p._id)}
                          size="small"
                        >
                          Eliminar
                        </IonButton>
                      </IonItem>
                    ))
                  )}
                </IonList>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonToast
          isOpen={!!message}
          message={message}
          duration={3000}
          onDidDismiss={() => setMessage("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default PostPage;
// ...existing code...
