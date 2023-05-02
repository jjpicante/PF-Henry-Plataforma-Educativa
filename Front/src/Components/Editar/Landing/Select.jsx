import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProfesor,
  getStudent,
  postAlumnoDeBaja,
  postProfesorDeBaja,
  deleteAlumno,
  deleteProfesor,
} from "../../../Redux/actions";
import styles from "./EditarLanding.module.css";
import { Table, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Select({ alumnos, profesores, año }) {
  const dispatch = useDispatch();
  const [renderArray, setRenderArray] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState({
    name: "",
    apellido: "",
    nacionalidad: "",
    datebirth: "",
    email: "",
    username: "",
    password: "",
    anio: "",
  });
  const [selectedProfesor, setSelectedProfesor] = useState({
    name: "",
    apellido: "",
    email: "",
    datebirth: "",
    nacionalidad: "",
    username: "",
    password: "",
  });

  const handleDeleteAlumno = async (username) => {
    const alumno = await dispatch(getStudent(username));
    console.log(alumno);
    const confirmacion = window.confirm(`¿Está seguro de que desea eliminar al alumno ${alumno.name} ${alumno.apellido}?`);
  if (confirmacion) {
    dispatch(postAlumnoDeBaja(alumno));
    dispatch(deleteAlumno(alumno.username));
    alert("alumno eliminado");
    setSelectedAlumno({
      name: "",
      apellido: "",
      nacionalidad: "",
      datebirth: "",
      email: "",
      username: "",
      password: "",
      anio: "",
    });
    window.location.reload();
  }
  };

  const handleDeleteProfesor = async (username) => {
    const profesor = await dispatch(getProfesor(username));
    console.log(profesor);
    const confirmacion = window.confirm(`¿Está seguro de que desea eliminar al profesor ${profesor.name} ${profesor.apellido}?`);
  if (confirmacion) {
    dispatch(postProfesorDeBaja(profesor));
    dispatch(deleteProfesor(profesor.username));
    alert("profesor eliminado");
    setSelectedProfesor({
      name: "",
      apellido: "",
      email: "",
      datebirth: "",
      nacionalidad: "",
      username: "",
      password: "",
    });
    window.location.reload();
  }
  };

  useEffect(() => {
    const fetchData = async () => {
      let newArray = [];
      if (profesores) {
        //Tods los profesores
        if (año === "Filtrar Año" || año === "Mostrar Todos") {
          for (const profesor of profesores) {
            const profe = await dispatch(getProfesor(profesor.username));
            const aulas = profe.Aulas;
            newArray.push({
              username: profesor.username,
              apellido: profesor.apellido,
              name: profesor.name,
              rol: profesor.rol,
              aulas: aulas.map((aula) => aula.anio).join(", "),
              key: profesor.id,
            });
          }

          //Profesores por año
        } else {
          for (const profesor of profesores) {
            const profe = await dispatch(getProfesor(profesor.username));
            const aulas = profe.Aulas;
            if (aulas.some((elem) => elem.anio === año)) {
              newArray.push({
                username: profesor.username,
                apellido: profesor.apellido,
                name: profesor.name,
                rol: profesor.rol,
                aulas: aulas.map((aula) => aula.anio).join(", "),
                key: profesor.id,
              });
            }
          }
        }
      }
      if (alumnos) {
        //Tods los Alumnos
        if (año === "Filtrar Año" || año === "Mostrar Todos") {
          for (const alumno of alumnos) {
            newArray.push({
              username: alumno[0].username,
              apellido: alumno[0].apellido,
              name: alumno[0].name,
              nacionalidad: alumno[0].nacionalidad,
              datebirth: alumno[0].datebirth,
              email: alumno[0].email,
              password: alumno[0].password,
              rol: alumno[0].rol,
              aulas: alumno[0].anio,
              key: alumno[0].id,
            });
          }

          //Alumnos por año
        } else {
          for (const alumno of alumnos) {
            if (alumno[0].anio === año) {
              newArray.push({
                username: alumno[0].username,
                apellido: alumno[0].apellido,
                name: alumno[0].name,
                nacionalidad: alumno[0].nacionalidad,
                datebirth: alumno[0].datebirth,
                email: alumno[0].email,
                password: alumno[0].password,
                rol: alumno[0].rol,
                aulas: alumno[0].anio,
                key: alumno[0].id,
              });
            }
          }
        }
      }
      setRenderArray(newArray);
    };
    fetchData();
  }, [alumnos, profesores, dispatch, año]);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            document.getElementById("search-input")?.select();
          });
        }
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
      sorter: (a, b) => a.apellido.localeCompare(b.apellido),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            document.getElementById("search-input")?.select();
          });
        }
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.apellido.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Role",
      dataIndex: "rol",
      key: "rol",
      width: 150,
    },
    {
      title: "Año",
      dataIndex: "aulas",
      key: "aulas",
      width: 100,
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (text, record) => (
        <>
          <Link
            to={
              record.rol === "student"
                ? `/editarAlumno/${record.username}`
                : `/editarProfesor/${record.username}`
            }
          >
            <Button type="primary">Editar</Button>{" "}
          </Link>
          <Button
            type="primary"
            danger
            onClick={
              record.rol === "student"
                ? () => {
                    handleDeleteAlumno(record.username);
                  }
                : () => {
                    handleDeleteProfesor(record.username);
                  }
            }
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={renderArray}
        scroll={{
          y: 1000,
        }}
      />
    </div>
  );
}
